function validation(field) {
	let errorList = [];

	if (field == 1) {
		if (!$('input[type=radio][name=itin_type]:checked').val()) {
			errorList.push('Application Type Is Required');
			Swal.fire({
				position: 'top-end',
				title: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Application Type Is Required!',
				showConfirmButton: false,
				background: 'red',
				timer: 3000,
			});
		}

		// var x = $("input[name='reason']:checked")[0].checked;

		if (!$('input[type=radio][name=reason]:checked').val()) {
			errorList.push('Reason for Submitting Form W-7 Is Required');
			Swal.fire({
				position: 'top-end',
				title: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Reason for Submitting Form W-7 Is Required!',
				showConfirmButton: false,
				background: 'red',
				timer: 3000,
			});
		} else {
			var value = $("input[name='reason']:checked").data('reason');
			if (value == 'a') {
				if ($('#treaty_country_for_nonresident').val() == '') {
					errorList.push('Treaty Country Is Required');
				}

				if ($('#treaty_article_for_nonresident').val() == '') {
					errorList.push('Treaty Article Number Is Required');
				}
			} else if (value == 'd') {
				if ($('#relationship_to_us_citizen').val() == '') {
					errorList.push(
						'Relationship To U.S. Citizen/Resident Alien Is Required'
					);
				}

				if ($('#identification_for_us_citizen').val() == '') {
					errorList.push(
						'Name And SSN/ITIN Of U.S Citizen/Resident Alien Is Required'
					);
				}
			} else if (value == 'e') {
				if ($('#spouse_info').val() == '') {
					errorList.push(
						'Name And SSN/ITIN Of U.S Citizen/Resident Alien'
					);
				}
			} else if (value == 'f') {
				if ($('#treaty_country_for_nonresident_spr').val() == '') {
					errorList.push('Treaty Country Is Required');
				}

				if ($('#treaty_article_for_nonresident_spr').val() == '') {
					errorList.push('Treaty Article Number Is Required');
				}
			} else if (value == 'h') {
				if ($('#other_info').val() == '') {
					errorList.push('Other Info Is Required');
				}
			}
		}
	}

	if (field == 2) {
		if ($('#first_name').val() == '') {
			errorList.push('First Name Is Required');
		}

		if ($('#last_name').val() == '') {
			errorList.push('Last Name Is Required');
		}
	}

	if (field == 3) {
		if ($('#us_address_line1').val() == '') {
			errorList.push('US Address Is Required');
		}

		if ($('#us_city').val() == '') {
			errorList.push('US City Is Required');
		}

		if ($('#us_state').val() == 'State') {
			errorList.push('US State Is Required');
		}

		if ($('#us_zip_code').val() == '') {
			errorList.push('US Zip Code Is Required');
		}

		if ($('#us_phone').val() == '') {
			errorList.push('US Phone Is Required');
		}
	}

	if (field == 4) {
		if ($('#date_of_birth').val() == '') {
			errorList.push('Date of Birth Is Required');
		}

		if ($('#country_of_birth').val() == '') {
			errorList.push('Country of Birth Is Required');
		}

		if (!$("input[name='gender']:checked")[0].checked) {
			errorList.push('Gender Is Required');
		}
	}

	if (field == 5) {
		if (
			$('select[name="country_of_citizenship[]"] option:selected')
				.length > 2
		) {
			errorList.push('The maximum number of countries is 2');
		}

		if (
			$('select[name="country_of_citizenship[]"] option:selected')
				.length == 0
		) {
			errorList.push('Country of Citizenship Is Required');
		}

		if (!$("input[name='id_document_type[]']").filter(':checked').length) {
			errorList.push('Identification Document Is Required');
		} else {
			// const checkedOtherInput = $("input[id='other_documentation']").prop(
			// 	'checked'
			// );
			// if (checkedOtherInput) {
			// 	if ($('#other_id_document_type').val() == '') {
			// 		errorList.push('other identification documents');
			// 	}
			// }

			if (
				$("input[name='id_document_type[]']")
					.parent()
					.next()
					.find('input:not(:disabled)[required]')
					.filter(function () {
						return $(this).val() == '';
					}).length ||
				$("input[name='id_document_type[]']")
					.parent()
					.next()
					.find('select:not(:disabled)[required]')
					.filter(function () {
						return $(this).val() == '';
					}).length
			) {
				errorList.push(
					'You must complete mandatory information related to the selected identification documents'
				);
			}
		}

		if ($('#issued_by').val() == '') {
			errorList.push('Issued By Is Required');
		}

		if ($('#id_no').val() == '') {
			errorList.push('Id No Is Required');
		}

		if ($('#exp_date').val() == '') {
			errorList.push('Exp. Date Is Required');
		}

		if (!document.querySelector('input[name="itin_or_irsn"]:checked')) {
			errorList.push(
				'Previously Received An ITIN Or An Internal Revenue Service Number Is Required'
			);
		} else {
			const value = document.querySelector(
				'input[name="itin_or_irsn"]:checked'
			).value;

			if (
				$('#itin_or_irsn_no').val() == '' &&
				value !== 'Not disclosure' &&
				$('#itin_or_irsn_no').val().length !== 9
			) {
				errorList.push('ITIN/IRSN Number Is Required');
			}

			if (value == 'itin') {
				if ($('#itin_or_irsn_first_name').val() == '') {
					errorList.push('ITIN First Name Is Required');
				}

				if ($('#itin_or_irsn_last_name').val() == '') {
					errorList.push('ITIN Last Name Is Required');
				}
			} else if (value === 'irsn') {
				if ($('#itin_or_irsn_first_name').val() == '') {
					errorList.push('IRSN First Name Is Required');
				}

				if ($('#itin_or_irsn_last_name').val() == '') {
					errorList.push('IRSN Last Name Is Required');
				}
			}
		}
	}

	if (field == 6) {
		if ($('#email').val() == '') {
			errorList.push('Email Is Required');
		}

		if ($('#confirm_email').val() == '') {
			errorList.push('Confirm Email Is Required');
		} else {
			if ($('#email').val() != $('#confirm_email').val()) {
				errorList.push('Confirm Email Is Not Matched');
			}
		}
	}

	return errorList;
}
