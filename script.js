$('.btn').each(function (index, btn) {
  $(btn).on('click', () => {
    // Temp variables
    const parent = $(btn).parent();
    const dataEl = parent.find('span');

    // Hide/Show field and name
    $(btn).toggle();
    parent.find('b').toggle();
    dataEl.toggle();


    const input =
      parent.append(
        $('<div></div>', {
          class: 'row'
        })
        .append([
          $('<div></div>', {
            class: 'col-8'
          })
          .append(
            $('<input>', {
              type: $(this).attr('data-type'),
              class: 'w-100'
            })
          ),
          $('<div></div>', {
            class: 'col-4'
          })
          .append(
            $('<button></button>', {
              class: 'btn btn-dark pull-right',
              html: 'Update'
            })
            .on('click', function() {
              save(parent, dataEl, $(btn));
              parent.find('b').toggle();
              dataEl.toggle();
              $(btn).toggle();
              parent.find('.row').remove();
            })
          )
        ])
      )
      .find('input');

    input.val(dataEl.html());

  });
});

function save(parent, dataEl, button) {
  const inputVal = parent
                    .find('.col-8')
                    .remove()
                    .find('input')
                    .val();

  dataEl.html(inputVal);

}