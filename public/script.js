document.getElementById('checkButton').addEventListener('click', () => {
    const addressToCheck = document.getElementById('addressInput').value;
    const apiUrl = `/api/address/${addressToCheck}`;
  
    fetch(apiUrl)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('Address not found');
        } else {
          throw new Error('Request failed');
        }
      })
      .then(data => {
        const resultContainer = document.getElementById('result');
        if (data.identifications.length > 0) {
          const identification = data.identifications[0];
          resultContainer.innerHTML = `
            <p>Address is sanctioned</p>
            <p>Category: ${identification.category}</p>
            <p>Name: ${identification.name}</p>
            <p>Description: ${identification.description}</p>
            <p><a href="${identification.url}" target="_blank">More info</a></p>
          `;
        } else {
          resultContainer.innerHTML = '<p>Address is not sanctioned</p>';
        }
      })
      .catch(error => {
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
  