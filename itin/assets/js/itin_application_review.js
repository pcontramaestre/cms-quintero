function SetReviewSection() {
	let html = `<table class="table table-bordered">
                      <tr>
                          <td>Application Type</td>`;

	html += `<td class="result-cell">${
		document.querySelector(
			`label[for="${
				document.querySelector('input[name="itin_type"]:checked').id
			}"]`
		).textContent
	}</td></tr>`;

	html += `<tr><td>Reason You're Submitting Form W-7</td>`;
	html += `<td class="result-cell">${
		document.querySelector(
			`label[for="${
				document.querySelector('input[name="reason"]:checked').id
			}"]`
		).textContent
	}<br>`;

	var value = $("input[name='reason']:checked").data('reason');
	if (value == 'a') {
		html += `Treaty Country: ${$(
			'#treaty_country_for_nonresident'
		).val()}<br>`;
		html += `Treaty Article Number: ${$(
			'#treaty_article_for_nonresident'
		).val()}`;
	} else if (value == 'd') {
		html += `Relationship To U.S. Citizen/Resident Alien: ${$(
			'#relationship_to_us_citizen'
		).val()}<br>`;
		html += `Name And SSN/ITIN Of U.S Citizen/Resident Alien: ${$(
			'#identification_for_us_citizen'
		).val()}`;
	} else if (value == 'e') {
		html += `Name And SSN/ITIN Of U.S Citizen/Resident Alien: ${$(
			'#spouse_info'
		).val()}`;
	} else if (value == 'f') {
		html += `Treaty Country: ${$(
			'#treaty_country_for_nonresident_spr'
		).val()}<br>`;
		html += `Treaty Article Number: ${$(
			'#treaty_article_for_nonresident_spr'
		).val()}`;
	} else if (value == 'h') {
		html += `Other: ${$('#other_info').val()}`;
	}
	html += `</td></tr>`;
	html += `<tr><td>Name</td>`;
	html += `<td class="result-cell">First Name: ${$('#first_name').val()}<br>`;
	html += `Middle Name: ${$('#middle_name').val()}<br>`;
	html += `Last Name: ${$('#last_name').val()}</td></tr>`;

	html += `<tr><td>Name at Birth if Different</td>`;
	html += `<td class="result-cell">First Name: ${$(
		'#first_name_at_birth'
	).val()}<br>`;
	html += `Middle Name: ${$('#middle_name_at_birth').val()}<br>`;
	html += `Last Name: ${$('#last_name_at_birth').val()}</td></tr>`;

	html += `<tr><td>Applicant's mailing Address</td>`;
	html += `<td class="result-cell">US Address: ${$(
		'#us_address_line1'
	).val()}<br>`;
	html += `US City: ${$('#us_city').val()}<br>`;
	html += `US State: ${$('#us_state option:selected').text()}<br>`;
	html += `US Zip Code: ${$('#us_zip_code').val()}<br>`;
	html += `Phone Number: ${$('#us_phone').val()}</td></tr>`;

	html += `<tr><td>Foreign (non-U.S.) Address</td>`;
	html += `<td class="result-cell">Non US Address: ${$(
		'#non_us_address_line1'
	).val()}<br>`;
	html += `Non US City: ${$('#non_us_city').val()}<br>`;
	html += `Non US State: ${
		$('#non_us_state option:selected').val() === ''
			? ''
			: $('#non_us_state option:selected').text()
	}<br>`;
	html += `Non US Country: ${
		$('#non_us_country option:selected').val() === ''
			? ''
			: $('#non_us_country option:selected').text()
	}<br>`;
	html += `Non US Zip Code: ${$('#non_us_zip_code').val()}<br>`;
	html += `Non US Country Phone Code: ${$(
		'#non_us_country_phone_code'
	).val()}<br>`;
	html += `Non US Phone Number: ${$('#non_us_phone').val()}</td></tr>`;

	html += `<tr><td>Birth Information</td>`;
	html += `<td class="result-cell">Date Of Birth: ${$(
		'#date_of_birth'
	).val()}<br>`;
	html += `Country Of Birth: ${$(
		'#country_of_birth option:selected'
	).text()}<br>`;
	html += `City Of Birth: ${$('#birth_city').val()}<br>`;
	// html += `Country Of Birth: ${getCountryNameByAlpha2Code($('#country_of_birth').val())}<br>`;
	// html += `Country Of Birth: <span id="countryName"></span><br>`;
	html += `State Or Province Of Birth: ${
		$('#birth_state option:selected').val() === ''
			? ''
			: $('#birth_state option:selected').text()
	}</td></tr>`;

	html += `<tr><td>Gender</td>`;
	html += `<td class="result-cell">${
		// $('input[name="gender"]:checked')[0].value
		$(
			`label[for="${
				document.querySelector('input[name="gender"]:checked').id
			}"]`
		).text()
	}</td></tr>`;

	html += `<tr><td rowspan="7">Other Information</td>`;

	html += `<td class="result-cell">Country(ies) Of Citizenship: ${$(
		'select[name="country_of_citizenship[]"] option:selected'
	)
		.map(function () {
			return this.textContent;
		})
		.get()
		.join(', ')}</td></tr>`;
	html += `<tr><td class="result-cell">Foreign Tax I.D. Number: ${$(
		'#foreign_tax_id'
	).val()}</td></tr>`;
	html += `<tr><td class="result-cell">Type Of U.S. Visa (If Any): ${$(
		'#us_visa_type'
	).val()}<br>`;
	html += `Number: ${$('#us_visa_number').val()}<br>`;
	html += `Expiration Date: ${$('#us_visa_exp_date').val()}</td></tr>`;

	html += `<tr><td class="result-cell">Identification Document: <br>${Array.from(
		document.querySelectorAll('input[name="id_document_type[]"]:checked')
	)
		.map(input => {
			const id = input.id;
			const cardBody = input
				.closest('.document-container')
				.querySelector('.card-body');
			const type = cardBody.querySelector(`#${id}_type`)?.value;
			const issuedBySelect = cardBody.querySelector(`#${id}_issued_by`);
			const issuedBy =
				issuedBySelect.options[issuedBySelect.selectedIndex]
					.textContent;

			const number = cardBody.querySelector(`#${id}_number`).value;
			const expDate = cardBody.querySelector(`#${id}_exp_date`).value;

			let documentInformation = '';

			documentInformation += `<strong>${
				document.querySelector(`label[for="${id}"]`).textContent
			}</strong><br>`;

			if (type) documentInformation += `Type: ${type}<br>`;
			documentInformation += `Issued By: ${issuedBy}<br>`;
			if (number) documentInformation += `No: ${number}<br>`;
			if (expDate) documentInformation += `Exp. Date: ${expDate}<br>`;
			return documentInformation;
		})
		.join('<br>')}<br>`;
	html += `Date Of Entry Into The United States: ${$(
		'#entry_date'
	).val()}</td></tr>`;

	html += `<tr><td class="result-cell">Previously Received An ITIN Or An IRSN: ${$(
		`label[for="${
			document.querySelector('input[name="itin_or_irsn"]:checked').id
		}"]`
	).text()}</td></tr>`;

	html += `<tr><td class="result-cell">Enter ITIN/IRSN: ${$(
		'#itin_or_irsn_no'
	).val()}<br>`;
	html += `First Name: ${$('#itin_or_irsn_first_name').val()}<br>`;
	html += `Middle Name: ${$('#itin_or_irsn_middle_name').val()}<br>`;
	html += `Last Name: ${$('#itin_or_irsn_last_name').val()}</td></tr>`;

	html += `<tr><td class="result-cell">Name Of College/University Or Company: ${$(
		'#college_univ_company'
	).val()}<br>`;
	html += `City: ${$('#college_univ_company_city').val()}<br>`;
	html += `State: ${
		$('#college_univ_company_state option:selected').val() === ''
			? ''
			: $('#college_univ_company_state option:selected').text()
	}<br>`;
	html += `Length Of Stay: ${$('#length_of_stay').val()}</td></tr>`;
	html += `<tr><td>Email</td>`;
	html += `<td class="result-cell">${$('#email').val()}</td></tr>`;
	html += `</table>`;
	$('#review_table_view').html(html);
}
