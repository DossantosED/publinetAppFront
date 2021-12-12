$(document).ready(function(){
    var zindex = 10;

    $('#nav-tab a').on('click', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

    const getDisplays = () => {
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:8000/api/displays',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            beforeSend: function () {
              document.querySelector('#cardDisplays').innerHTML = '<div class="spinner-border text-primary" role="status"></div>'
            },
            success: function (data) {
              document.querySelector('#cardDisplays').innerHTML = ""
              if(data.length == 0){
                document.querySelector('#cardDisplays').innerHTML = "No hay pantallas creadas"
              }
              data.forEach(function(display){
                document.querySelector('#cardDisplays').innerHTML = document.querySelector('#cardDisplays').innerHTML+  `<div class="card" id="card-${display.id}"><div class="card__image-holder"><img class="card__image" src="https://source.unsplash.com/300x225/?wave" alt="wave" /></div><div class="card-title"><a href="#" class="toggle-info btton"><span class="left"></span><span class="right"></span></a><h2>${display.name}<small>Empresa: ${getCompany(display.company_id).name}</small></h2></div><div class="card-flap flap1"><div class="card-description"><b>Precio:</b> $${display.price} <br> <b>Latitud:</b> ${display.latitude} <br> <b>Longitud:</b> ${display.longitude} <br> <b>Tipo:</b> ${display.type}</div><div class="card-flap flap2"><div class="card-actions"><a class="btton btnEdit" data-id="${display.id}">Editar</a> <a class="btton btnDelete" data-id="${display.id}">Eliminar</a></div></div></div></div>`;
              })
            }
        });
    }

    getDisplays();
    getCompanies(); 

    function getCompany (company_id) {
      let company = "";
      $.ajax({
        type: "GET",
        async: false,
        url: 'http://127.0.0.1:8000/api/companies/'+company_id,
        dataType: "json",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        success: function (data) {
          company = data.company;
        }
      });
      return company;
    }

    function getCompanies () {
      $.ajax({
        type: "GET",
        async: false,
        url: 'http://127.0.0.1:8000/api/companies/',
        dataType: "json",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        beforeSend: function () {
          document.querySelector('#cardCompanies').innerHTML = '<div class="spinner-border text-primary" role="status"></div>'
        },
        success: function (data) {
          document.querySelector('#cardCompanies').innerHTML = ""
          if(data.length == 0){
            document.querySelector('#cardCompanies').innerHTML = "No hay empresas creadas"
          }
          data.forEach(function(companies){
            var optionCompany = new Option("option text", companies.id);
            var optionCompany2 = new Option("option text", companies.id);
            var optionCountry = new Option("option text", companies.country);
            $(optionCompany).html(companies.name);
            $(optionCompany2).html(companies.name);
            $(optionCountry).html(companies.country);
            setTimeout(() => {
              $("#company").append(optionCompany)
            }, 2000);
            $("#filtroEmpresa").append(optionCompany2)
            $("#filtroPais").append(optionCountry)
            document.querySelector('#cardCompanies').innerHTML = document.querySelector('#cardCompanies').innerHTML+  `<div class="card" id="card-company-${companies.id}"><div class="card__image-holder"><img class="card__image" src="https://source.unsplash.com/300x225/?wave" alt="wave" /></div><div class="card-title"><a href="#" class="toggle-info btton"><span class="left"></span><span class="right"></span></a><h2>${companies.name}<small>Pais: ${companies.country}</small></h2></div><div class="card-flap flap1"><div class="card-description"></div><div class="card-flap flap2"><div class="card-actions"><a class="btton btnEditEmpresa" data-id="${companies.id}">Editar</a> <a class="btton btnDeleteEmpresa" data-id="${companies.id}">Eliminar</a></div></div></div></div>`;
          })
          $("#filtroPais option").each(function() {
            $(this).siblings('[value="'+ this.value +'"]').remove();
          });
          $("#filtroEmpresa option").each(function() {
            $(this).siblings('[value="'+ this.value +'"]').remove();
          });
        }
      });
    }

    function getDisplay(display_id) {
      let display = "";
      $.ajax({
        type: "GET",
        async: false,
        url: 'http://127.0.0.1:8000/api/displays/'+display_id,
        dataType: "json",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        success: function (data) {
          display = data.display;
        }
      });
      return display;
    }

    function getDiplayByCompany (company_id){
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:8000/api/companies/'+company_id+'/displays',
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            beforeSend: function(data) {
              document.querySelector('#cardDisplays').innerHTML = '<div class="spinner-border text-primary" role="status"></div>'
            },
            success: function (data) {
              document.querySelector('#cardDisplays').innerHTML = "";
              if(data.displays.length == 0){
                document.querySelector('#cardDisplays').innerHTML = "Esta empresa no tiene pantallas"
              }
              data.displays.forEach(function(display){
                document.querySelector('.cards').innerHTML = document.querySelector('.cards').innerHTML+  `<div class="card" id="card-${display.id}"><div class="card__image-holder"><img class="card__image" src="https://source.unsplash.com/300x225/?wave" alt="wave" /></div><div class="card-title"><a href="#" class="toggle-info btton"><span class="left"></span><span class="right"></span></a><h2>${display.name}<small>Empresa: ${getCompany(display.company_id).name}</small></h2></div><div class="card-flap flap1"><div class="card-description"><b>Precio:</b> $${display.price} <br> <b>Latitud:</b> ${display.latitude} <br> <b>Longitud:</b> ${display.longitude} <br> <b>Tipo:</b> ${display.type}</div><div class="card-flap flap2"><div class="card-actions"><a class="btton btnEdit" data-id="${display.id}">Editar</a> <a class="btton btnDelete" data-id="${display.id}">Eliminar</a></div></div></div></div>`;
              })
            }
        });
    }

    function getDiplayByCountry (country){
      $.ajax({
          type: "GET",
          url: 'http://127.0.0.1:8000/api/displays',
          dataType: "json",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          data:{
            country: country
          },
          beforeSend: function(data) {
            document.querySelector('#cardDisplays').innerHTML = '<div class="spinner-border text-primary" role="status"></div>'
          },
          success: function (data) {
            document.querySelector('#cardDisplays').innerHTML = "";
            if(data.length == 0){
              document.querySelector('#cardDisplays').innerHTML = "Este pais no tiene pantallas"
            }
            data.forEach(function(display){
              document.querySelector('#cardDisplays').innerHTML = document.querySelector('#cardDisplays').innerHTML+  `<div class="card" id="card-${display.id}"><div class="card__image-holder"><img class="card__image" src="https://source.unsplash.com/300x225/?wave" alt="wave" /></div><div class="card-title"><a href="#" class="toggle-info btton"><span class="left"></span><span class="right"></span></a><h2>${display.name}<small>Empresa: ${getCompany(display.company_id).name}</small></h2></div><div class="card-flap flap1"><div class="card-description"><b>Precio:</b> $${display.price} <br> <b>Latitud:</b> ${display.latitude} <br> <b>Longitud:</b> ${display.longitude} <br> <b>Tipo:</b> ${display.type}</div><div class="card-flap flap2"><div class="card-actions"><a class="btton btnEdit" data-id="${display.id}">Editar</a> <a class="btton btnDelete" data-id="${display.id}">Eliminar</a></div></div></div></div>`;
            })
          }
      });
  }

    $(document).on('click','div.card',function(e){
      e.preventDefault();
  
      var isShowing = false;
  
      if ($(this).hasClass("show")) {
        isShowing = true
      }
  
      if ($("div.cards").hasClass("showing")) {
        // a card is already in view
        $("div.card.show")
          .removeClass("show");
  
        if (isShowing) {
          // this card was showing - reset the grid
          $("div.cards")
            .removeClass("showing");
        } else {
          // this card isn't showing - get in with it
          $(this)
            .css({zIndex: zindex})
            .addClass("show");
  
        }
  
        zindex++;
  
      } else {
        // no cards in view
        $("div.cards")
          .addClass("showing");
        $(this)
          .css({zIndex:zindex})
          .addClass("show");
  
        zindex++;
      }
      
    });

    $(document).on('click','.btnDelete',function(e){
      let id = $(this).data('id');
      Swal.fire({
        title: 'Seguro desea eliminar esta pantalla?',
        showDenyButton: true,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Borrar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "DELETE",
            url: 'http://127.0.0.1:8000/api/displays/'+id,
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            success: function (data) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Pantalla eliminada!',
                showConfirmButton: false,
                timer: 1000
              })
              $('#card-'+id).hide('slow', function(){ $('#card-'+id).remove()});
              setTimeout(() => {
                if($('#cardDisplays')[0].children.length == 0){
                  document.querySelector('#cardDisplays').innerHTML = "No hay pantallas creadas"
                }
              }, 1000);
            },
            error : function (data){
              Swal.fire(data.message ?? 'Error desconocido', '', 'error')
            }
          });
        }
      })
    });

    $(document).on('click','.btnDeleteEmpresa',function(e){
      let id = $(this).data('id');
      Swal.fire({
        title: 'Seguro desea eliminar esta empresa?',
        showDenyButton: true,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Borrar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "DELETE",
            url: 'http://127.0.0.1:8000/api/companies/'+id,
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            success: function (data) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1000
              })
              $('#card-company-'+id).hide('slow', function(){ $('#card-company-'+id).remove()});
              setTimeout(() => {
                if($('#cardCompanies .card').length == 0){
                  document.querySelector('#cardCompanies').innerHTML = "No hay empresas creadas"
                }
              }, 1000);
            },
            error : function (data){
              Swal.fire(data.responseJSON.message ?? 'Error desconocido', '', 'error')
            }
          });
        }
      })
    });

    $(document).on('click','.btnEdit',function(e){
      let id = $(this).data('id');
      $('#guardarPantalla').attr('data-id',id);
      $('#tituloModalPantallas').text('Editar pantalla')
      $('#modalPantallas').modal('show')
      let display = getDisplay(id);
      $('#name').val(display.name);
      $('#company').val(getCompany(display.company_id).id);
      $('#latitude').val(display.latitude);
      $('#longitude').val(display.longitude);
      $('#type').val(display.type);
      $('#price').val(display.price);
      $('#guardarPantalla').attr('data-edit', "true");
    });

    $(document).on('click','.btnEditEmpresa',function(e){
      let id = $(this).data('id');
      $('#guardarEmpresa').attr('data-id',id);
      $('#tituloModalEmpresas').text('Editar pantalla')
      $('#modalEmpresas').modal('show')
      let company = getCompany(id);
      $('#name_company').val(company.name);
      $('#country').val(company.country);
      $('#guardarEmpresa').attr('data-edit', "true");
    });

    $(document).on('click','#guardarEmpresa',function(e){
      let id = $(this).data('id');
      let edit = $(this).data('edit');
      createOrUpdateCompany(edit, id);
    });

    $(document).on('click','#guardarPantalla',function(e){
      let id = $(this).data('id');
      let edit = $(this).data('edit');
      createOrUpdateDisplay(edit, id);
    });

    $('#cancel').click( function () {
      $('#modalPantallas').modal('hide')
    })

    $('#cancel_empresa').click( function () {
      $('#modalEmpresas').modal('hide')
    })

    $(document).on('click','#crearPantalla',function(e){
      $('#tituloModalPantallas').text('Crear pantalla')
      $('#guardarPantalla').attr('data-edit', "false");
      $('#modalPantallas').modal('show')
    });

    $(document).on('click','#crearEmpresa',function(e){
      $('#tituloModalEmpresas').text('Crear empresa')
      $('#modalEmpresas').attr('data-edit', "false");
      $('#modalEmpresas').modal('show')
    });


    $("#modalPantallas").on("hidden.bs.modal", function(){
      $('#name').val('');
      $('#company').val(0);
      $('#latitude').val('');
      $('#longitude').val('');
      $('#type').val(0);
      $('#price').val('');
    })

    $("#modalEmpresas").on("hidden.bs.modal", function(){
      $('#name_company').val('');
      $('#country').val('');
    })

    function createOrUpdateDisplay(edit, id){
      let type = 'POST'
      url = 'http://127.0.0.1:8000/api/displays'
      if(edit){
        type = 'PUT'
        url = 'http://127.0.0.1:8000/api/displays/'+id
      }
      var formData = {
        name: $('#name').val(),
        company_id: $('#company').val(),
        latitude: $('#latitude').val(),
        longitude: $('#longitude').val(),
        type: $('#type').val(),
        price: $('#price').val()
      };
      $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data:formData
        ,
        success: function (data) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1000
          })
          $("#modalPantallas").modal('hide')
          getDisplays()
        },
        error: function (data){
          if(data.responseJSON.message == "The given data was invalid."){
            insertarErrores('#name', 'errorDisplayName', data.responseJSON.errors.name);
            insertarErrores('#company', 'errorDisplayComapny', data.responseJSON.errors.company_id);
            insertarErrores('#latitude', 'errorDisplayLatitude', data.responseJSON.errors.latitude);
            insertarErrores('#longitude', 'errorDisplayLongitude', data.responseJSON.errors.longitude);
            insertarErrores('#price', 'errorDisplayPrice', data.responseJSON.errors.price);
            insertarErrores('#type', 'errorDisplayType', 'Seleccione un tipo');
          }else{
            Swal.fire({
              icon: 'error',
              title: data.responseJSON.message
            })
          }
        }
      });
    }

    function insertarErrores (id, idError, error){
      if ($('#'+idError).length == 0 && error){
        $(id).after(`<p style="color: red" id="${idError}">${error}</p>`)
      }else{
        if(!error){
          $('#'+idError).remove()
        }
      }
    }

    function createOrUpdateCompany(edit, id){
      let type = 'POST'
      url = 'http://127.0.0.1:8000/api/companies'
      if(edit){
        type = 'PUT'
        url = 'http://127.0.0.1:8000/api/companies/'+id
      }
      var formData = {
        name: $('#name_company').val(),
        country: $('#country').val(),
      };
      $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data:formData
        ,
        success: function (data) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1000
          })
          $("#modalEmpresas").modal('hide')
          getCompanies()
        },
        error: function (data){
            if(data.responseJSON.message == "The given data was invalid."){
              insertarErrores('#name_company', 'errorCompanyName', data.responseJSON.errors.name);
              insertarErrores('#country', 'errorComapnyCountry', data.responseJSON.errors.country);
            }else{
              Swal.fire({
                icon: 'error',
                title: data.responseJSON.message
              })
            }
        }
      });
    }

    $(document).on('change','#filtroEmpresa',function(e){
      let empresa = $(this).val()
      if(empresa == "todos"){
        document.querySelector('#cardDisplays').innerHTML = ""
        getDisplays();
      }else{
        getDiplayByCompany(empresa);
      }
    });

    $(document).on('change','#filtroPais',function(e){
      let pais = $(this).val()
      if(pais == "todos"){
        document.querySelector('#cardDisplays').innerHTML = ""
        getDisplays();
      }else{
        getDiplayByCountry(pais);
      }
    });

  });