// Obtener el formulario y añadirle un evento de submit
document.getElementById('upload-form').addEventListener('submit', event => {
   event.preventDefault()

   var formData = new FormData()
   var fileInput = document.getElementById('archivo')

   if (fileInput.files.length === 0) {
      Swal.fire('Error', 'Por favor carga una imagen', 'warning');
      return;
   }

   formData.append('archivo', fileInput.files[0])

   Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera mientras procesamos la imagen.',
      allowOutsideClick: false,
      didOpen: () => {
         Swal.showLoading()
      }
   });

   fetch('https://jorgemiranda.onrender.com/get_key_facials', {
      method: 'POST',
      body: formData
   })
      .then(response => response.json())
      .then(data => {

         Swal.close();

         if (data.error) {
            Swal.fire('Error', data.error, 'error');
            return
         }

         Swal.fire({
            icon: "success",
            title: "Imagen Procesada",
            showConfirmButton: false,
            timer: 1000
         });

         var imagen_original = document.getElementById('imagen_original')
         var contenedor_imagen = document.getElementById('image-ploted')
         imagen_original.src = `data:image/jpeg;base64,${data.image_base64}`
         contenedor_imagen.classList.toggle('image-ploted')

      })
      .catch(error => {
         Swal.close();
         console.error('ERROR', error);
         Swal.fire('Error', 'Ocurrió un problema al procesar la imagen.', 'error');
      });
})
