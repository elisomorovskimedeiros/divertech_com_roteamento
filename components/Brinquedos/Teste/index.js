import React, { useState } from 'react';

const UploadFile = () => {
  var activeItem = null;
  var offsetX = null;
  var offsetY = null;


    // Evento para iniciar o arraste
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('draggable')) {
            activeItem = e.target;

            // Obtém a posição inicial do toque
            var touch = e.targetTouches[0];
            offsetX = touch.pageX - activeItem.offsetLeft;
            offsetY = touch.pageY - activeItem.offsetTop;
        }
    });

    // Evento para mover a div enquanto arrasta
    document.addEventListener('touchmove', function(e) {
        if (activeItem !== null) {
            // Evita que a página role enquanto arrasta
            e.preventDefault();

            // Atualiza a posição da div conforme o toque se move
            var touch = e.targetTouches[0];
            activeItem.style.left = (touch.pageX - offsetX) + 'px';
            activeItem.style.top = (touch.pageY - offsetY) + 'px';
        }
    });

    // Evento para finalizar o arraste
    document.addEventListener('touchend', function() {
        activeItem = null;
    });

  return (
    <div className='toutch'>
      <div id="draggable1" class="draggable" draggable="true">Drag me!</div>
      <div id="draggable2" class="draggable" draggable="true">Drag me too!</div>

      <script>
          // Seu JavaScript para tornar as divs arrastáveis vai aqui
      </script>
    </div>
  );
};

export default UploadFile;
