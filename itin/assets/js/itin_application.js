/**
 *
 */

$('#checkboxes').hide();

/**
 * Get States for Foreign (non-U.S.) Address
 */

let itin_id;

function createITIN(temporal) {
	const body = new FormData(document.getElementById('msform'));
	body.append('temporal', temporal);
	//if (itin_id) body.append('itin_id', itin_id);
	if (itin_id && temporal) body.append('itin_id', itin_id);
	return fetch(baseURL + '/services/itin/functions/itin_application.php', {
		method: 'POST',
		body: body,
	}).then(res => res.json());
}

$(document).ready(function () {
	$('#non_us_country').change(function () {
		var selectedCountry = $(this).val();
		var formLanguage = $('#formLanguage').val();

		console.log(
			'Datos enviados en la solicitud AJAX para el Country for Foreign (non-U.S.) Address:'
		);
		console.log('selectedCountry:', selectedCountry);
		console.log('formLanguage:', formLanguage);

		// Enviar solicitud AJAX para obtener los estados
		$.ajax({
			url: baseURL + '/functions/get_states.php',
			type: 'POST',
			data: {
				country_code: selectedCountry,
				formLanguage: formLanguage,
			},
			success: function (response) {
				// Limpiar el select de estados
				$('#non_us_state').empty();
				$('#non_us_state').append(
					'<option value="">Select State</option>'
				);

				// Añadir los estados obtenidos al select
				$.each(JSON.parse(response), function (index, state) {
					$('#non_us_state').append(
						'<option value="' +
							state.iso_code +
							'">' +
							state.name +
							'</option>'
					);
				});
			},
			error: function (xhr, status, error) {
				console.error('Error al obtener los estados:', error);
			},
		});
	});
});

/**
 * Get Country Phone Code
 */

$(document).ready(function () {
	$('#non_us_country').change(function () {
		var selectedCountry = $(this).val();

		console.log(
			'Datos enviados en la solicitud AJAX para el Country Phone Code:'
		);
		console.log('selectedCountry:', selectedCountry);

		// Enviar solicitud AJAX para obtener el código telefónico del país
		$.ajax({
			url: baseURL + '/functions/get_country_phone_code.php', // Actualiza la URL al archivo correspondiente
			type: 'POST',
			data: {
				country_code: selectedCountry,
			},
			success: function (response) {
				var phoneCode = JSON.parse(response).phone_code; // Parse la respuesta JSON y accede a la propiedad phone_code
				console.log('Código telefónico del país:', response);
				// Actualiza el elemento en tu página donde deseas mostrar el código telefónico
				$('#non_us_country_phone_code').empty();
				$('#non_us_country_phone_code').append(
					'<option value="' +
						phoneCode +
						'">' +
						phoneCode +
						'</option>'
				);
			},
			error: function (xhr, status, error) {
				console.error(
					'Error al obtener el código telefónico del país:',
					error
				);
			},
		});
	});
});

/**
 * Get States for Birth Information
 */

$(document).ready(function () {
	$('#country_of_birth').change(function () {
		var selectedCountry = $(this).val();
		var formLanguage = $('#formLanguage').val();

		console.log(
			'Datos enviados en la solicitud AJAX para el Country for Birth:'
		);
		console.log('selectedCountry:', selectedCountry);
		console.log('formLanguage:', formLanguage);

		// Enviar solicitud AJAX para obtener los estados
		$.ajax({
			url: baseURL + '/functions/get_states.php',
			type: 'POST',
			data: {
				country_code: selectedCountry,
				formLanguage: formLanguage,
			},
			success: function (response) {
				// Limpiar el select de estados
				$('#birth_state').empty();
				$('#birth_state').append(
					'<option value="">Select State</option>'
				);

				// Añadir los estados obtenidos al select
				$.each(JSON.parse(response), function (index, state) {
					$('#birth_state').append(
						'<option value="' +
							state.iso_code +
							'">' +
							state.name +
							'</option>'
					);
				});
			},
			error: function (xhr, status, error) {
				console.error('Error al obtener los estados:', error);
			},
		});
	});
});

/**
 *
 */

function resizeFloatingDocumentsBasedOnWindowWidth() {
	if ($(window).width() < 768) {
		$('#documents .form-floating').each(function (index, element) {
			const parent = $(this).parent();
			parent.removeClass('input-group');
			parent.addClass('d-flex');
			parent.addClass('flex-column');
			parent.addClass('gap-3');
		});
		return;
	}

	$('#documents .form-floating').each(function (index, element) {
		const parent = $(this).parent();
		parent.removeClass('d-flex');
		parent.removeClass('flex-column');
		parent.removeClass('gap-3');
		parent.addClass('input-group');
	});
}

$(document).ready(function () {
	var current_fs, next_fs, previous_fs;
	var current_fs2, next_fs2, previous_fs2; //fieldsets
	var opacity;
	var field = 1;
	var progress = 0;

	// $('#msform fieldset').each(function (index, element) {
	// 	if (index != 3) {
	// 		$(this).hide();
	// 		return;
	// 	}
	// 	$(this).show();
	// });

	$(window).on('resize', resizeFloatingDocumentsBasedOnWindowWidth);

	resizeFloatingDocumentsBasedOnWindowWidth();

	$('#documents').on(
		'change',
		'input[name="id_document_type[]"]',
		function (event) {
			if (event.target.checked) {
				$(this).parent().addClass('card-header');
				$(this).parent().addClass('justify-content-center');
				// $(this).parent().parent().addClass('mb-3');
				$(this).parent().parent().addClass('card');
				$(this).parent().next().removeClass('d-none');

				$(this).parent().next().find('input').prop('disabled', false);

				$(this).parent().next().find('select').prop('disabled', false);
				return;
			}

			$(this).parent().removeClass('card-header');
			$(this).parent().removeClass('justify-content-center');
			// $(this).parent().parent().removeClass('mb-3');
			$(this).parent().parent().removeClass('card');
			$(this).parent().next().addClass('d-none');

			$(this).parent().next().find('input').prop('disabled', true);
			$(this).parent().next().find('select').prop('disabled', true);
		}
	);

	$('#certify_info_itin_application').on('change', function () {
		if ($(this).is(':checked')) {
			$('#review-next-button').prop('disabled', false);
		} else {
			$('#review-next-button').prop('disabled', true);
		}
	});

	$('#itin_or_irsn_no').on('input', function (event) {
		if (!$(this).val().match(/^\d+$/)) {
			$(this).val($(this).val().replace(/\D/g, ''));
		}
	});

	$('#country_of_citizenship').select2({
		placeholder: 'Select Country',
		width: '100%',
		maximumSelectionLength: 2,
	});

	$('#country_of_citizenship + span').addClass('country_of_citizenship');

	$('#review-button').click(function () {
		SetReviewSection();
	});

	$('.next').click(function () {
		let errorList = validation(field);

		if (errorList.length > 0) {
			let html = `<ul style="color:red;">`;

			$.each(errorList, function (k, v) {
				html += `<li>${v}</li>`;
			});
			html += '</ul>';
			$('#errorlist').html(html).show();
		} else {
			$('#errorlist').html('').hide();

			current_fs2 = $(this).parent().parent().parent().parent();
			next_fs2 = $(this).parent().parent().parent().parent().next();
			progress++;
			//Add Class Active
			$('#progressbar li').eq(progress).addClass('active');

			//show the next fieldset
			next_fs2.show();
			//hide the current fieldset with style
			current_fs2.animate(
				{
					opacity: 0,
				},
				{
					step: function (now) {
						// for making fielset appear animation
						opacity = 1 - now;

						current_fs2.css({
							display: 'none',
							position: 'relative',
						});
						next_fs2.css({
							opacity: opacity,
						});
					},
					duration: 600,
				}
			);

			// if (progress == 1) {
			// 	var form = document.getElementById('msform');
			// 	var data = new FormData(form);

			// 	fetch(baseURL + '/functions/itin_application.php', {
			// 		method: 'POST',
			// 		body: data,
			// 	})
			// 		.then(res => res.json())
			// 		.then(data => {})
			// 		.catch(error => {});
			// }
		}
	});

	$('.next2').click(function () {
		let errorList = validation(field);
		if (errorList.length > 0) {
			let html = `<ul style="color:red;">`;

			$.each(errorList, function (k, v) {
				html += `<li>${v}</li>`;
			});
			html += '</ul>';
			$('#errorlist').html(html).show();
		} else {
			$('#errorlist').html('').hide();
			current_fs = $(this).parent().parent().parent().parent();
			next_fs = $(this).parent().parent().parent().parent().next();

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
			current_fs.animate(
				{
					opacity: 0,
				},
				{
					step: function (now) {
						// for making fielset appear animation
						opacity = 1 - now;

						current_fs.css({
							display: 'none',
							position: 'relative',
						});
						next_fs.css({
							opacity: opacity,
						});
					},
					duration: 600,
				}
			);

			field++;

			createITIN(true).then(data => {
				itin_id = data.itin_id;
			});

			//recibir id para itin_application_temp
		}
	});

	$('.previous').click(function () {
		current_fs2 = $(this).parent().parent().parent().parent();
		previous_fs2 = $(this).parent().parent().parent().parent().prev();

		//Remove class active
		$('#progressbar li').eq(progress).removeClass('active');
		progress--;
		//show the previous fieldset
		previous_fs2.show();

		//hide the current fieldset with style
		current_fs2.animate(
			{
				opacity: 0,
			},
			{
				step: function (now) {
					// for making fielset appear animation
					opacity = 1 - now;

					current_fs2.css({
						display: 'none',
						position: 'relative',
					});
					previous_fs2.css({
						opacity: opacity,
					});
				},
				duration: 600,
			}
		);
	});

	$('.previous2').click(function () {
		current_fs = $(this).parent().parent().parent().parent();
		previous_fs = $(this).parent().parent().parent().parent().prev();

		//show the previous fieldset
		previous_fs.show();

		//hide the current fieldset with style
		current_fs.animate(
			{
				opacity: 0,
			},
			{
				step: function (now) {
					// for making fielset appear animation
					opacity = 1 - now;

					current_fs.css({
						display: 'none',
						position: 'relative',
					});
					previous_fs.css({
						opacity: opacity,
					});
				},
				duration: 600,
			}
		);

		field--;
	});

	//register w7 form in database

	$('#make_payment').click(function () {
		createITIN(false).then(data => {
			if (!data.success) {
				alert('Error, Try Again Later');
				return;
			}

			const url = `${baseURL}/services/itin/thank_you`;
			const form = document.createElement('form');
			form.method = 'POST';
			form.action = url;

			const orderIdInput = document.createElement('input');
			orderIdInput.type = 'hidden';
			orderIdInput.name = 'order_id';
			orderIdInput.value = data.order_id;

			const orderDateInput = document.createElement('input');
			orderDateInput.type = 'hidden';
			orderDateInput.name = 'order_date';
			orderDateInput.value = data.order_date;

			const orderStatusInput = document.createElement('input');
			orderStatusInput.type = 'hidden';
			orderStatusInput.name = 'order_status';
			orderStatusInput.value = data.order_status;

			const orderAmountInput = document.createElement('input');
			orderAmountInput.type = 'hidden';
			orderAmountInput.name = 'order_amount';
			orderAmountInput.value = data.order_amount;

			const serviceTypeInput = document.createElement('input');
			serviceTypeInput.type = 'hidden';
			serviceTypeInput.name = 'service_type';
			serviceTypeInput.value = 'ITIN Application';

			form.append(orderIdInput);
			form.append(orderDateInput);
			form.append(orderStatusInput);
			form.append(orderAmountInput);
			form.append(serviceTypeInput);

			document.body.append(form);
			form.submit();
		});
	});

	// $('#review-next-button').click(function () {
	// 	const body = new FormData(document.getElementById('msform'));
	// 	body.append('temporal', true);
	// 	fetch(baseURL + '/services/itin/insert-itin-application.php', {
	// 		method: 'POST',
	// 		body: body,
	// 	})
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			if (data.status == 'success') {
	// 				$('#msform').submit();
	// 			}
	// 		})
	// 		.catch(error => {});
	// });

	function soloLetras(e) {
		key = e.keyCode || e.which;
		tecla = String.fromCharCode(key).toLowerCase();
		letras = '0123456789';
		especiales = [8, 37, 39, 46];

		tecla_especial = false;
		for (var i in especiales) {
			if (key == especiales[i]) {
				tecla_especial = true;
				break;
			}
		}

		if (letras.indexOf(tecla) == -1 && !tecla_especial) return false;
	}

	function limpia() {
		var val = document.getElementById('miInput').value;
		var tam = val.length;
		for (i = 0; i < tam; i++) {
			if (!isNaN(val[i])) document.getElementById('miInput').value = '';
		}
	}

	$('.radio-group .radio').click(function () {
		$(this).parent().find('.radio').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.submit').click(function () {
		return false;
	});
});
