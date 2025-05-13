document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('cal-input');
  const warning = document.getElementById('char-warning');
  const button = document.querySelector('.calc-btn');
  const container = document.querySelector('.contact__group');

  // Debounce function
  function debounce(fn, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Validation of input length
  const validateLength = () => {
    if (textarea.value.length >= 300) {
      warning.style.display = 'block';
    } else {
      warning.style.display = 'none';
    }
  };

  // Input listener with debounce
  textarea.addEventListener(
    'input',
    debounce(() => {
      validateLength();

      if (textarea.value.length > 300) {
        textarea.value = textarea.value.slice(0, 300);
      }
    }, 300)
  );

  // Submit handler
  button.addEventListener('click', async (e) => {
    if (button.disabled) return;

    e.preventDefault();

    const inputValue = textarea.value.trim();

    if (!inputValue) {
      alert('Molimo unesite poruku.');
      return;
    }

    button.disabled = true;
    button.textContent = 'Proveravam...';

    try {
      const response = await fetch('https://law-classify.onrender.com/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });

      const result = await response.json();

      mixpanel.track('Upit poslat', {
        tekst: inputValue
      });
      
      if (result.name === 'NEKATEGORISANO') {
        mixpanel.track('Nekategorizovan odgovor', {
          tekst: inputValue
        });
      } else {
        mixpanel.track('Kategorija klasifikovana', {
          kategorija: result.name,
          opis: result.description,
          cena_min: result.minPrice,
          cena_max: result.maxPrice
        });
      }
      if (!response.ok) {
        throw new Error(result.error || 'Greška prilikom klasifikacije.');
      }

      // Fallback for unclassified
      if (result.name === 'NEKATEGORISANO') {
        container.innerHTML = `
          <div class="result-box">
            <h3>Vaš upit nije mogao biti precizno klasifikovan.</h3>
            <p>Preporučujemo da se konsultujete sa advokatom radi tačnog razvrstavanja vašeg slučaja.</p>
          </div>
        `;
        return;
      }

      // Display results
      container.innerHTML = `
        <div class="result-box">
          <h3>Kategorija: ${result.name}</h3>
          <p>${result.description || 'Nema dodatnog opisa.'}</p>
          <p><strong>Procenjena cena:</strong> ${result.minPrice} – ${result.maxPrice} DIN</p>
        </div>
      `;
    } catch (err) {
      alert(err.message || 'Greška prilikom slanja.');
      console.error(err);
    } finally {
      button.disabled = false;
      button.textContent = 'Pošaljite';
    }
  });
});
