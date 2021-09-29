const months =  ['January','February','March','April','May','June', 'July',
                'August', 'September', 'October', 'November', 'December']

$('.btn').each(function (index, btn) {
  $(btn).on('click', update)
});

function update() {
  // Temp variables
  const parent = $(this).parent();
  const data = parent.find('span').html();
  const name = parent.find('b').html();

  parent.empty();

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
            type: parent.attr('data-type'),
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
            save(parent, name);
          })
        )
      ])
    )
    .find('input');

  input.val(
    input.attr('type') === 'date'
    ? convertDate(new Date(data))
    : data
  );
}

function convertDate(dateVal) {
  let newDate = '';

  if (typeof(dateVal) === 'string') {
    const date = new Date(dateVal);
    newDate = String(date.getDate()).padStart(2,'0')
      +' '+months[date.getMonth()]
      +' '+date.getFullYear();
  }
  else {
    newDate = dateVal.getFullYear()
    +'-'+String(dateVal.getMonth()+1).padStart(2, '0')
    +'-'+String(dateVal.getDate()).padStart(2, '0');
  }

  return newDate;
}

function save(parent, name) {
  const input = parent.find('input');

  const inputVal = input.attr('type') === 'date'
                    ? convertDate(input.val())
                    : input.val();

  parent.empty();

  parent.append([
    $('<b></b>', {
      html: name+' '
    }),
    $('<span></span>', {
      html: inputVal
    }),
    $('<button></button>',
    {
      class: 'btn btn-dark pull-right',
      html: 'Edit'
    })
    .on('click', update)
  ]);
}