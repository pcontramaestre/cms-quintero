let ReasonInfoRepository = [
	{
		Id: 1,
		Reason: 'a',
		Text: `<p class="boxcaption__title">Reason A</p>
                      <p class="boxcaption__content">Check this box to claim certain tax treaty benefits.
                      You must also check box "h" and enter the appropriate
                      <a href="#" target="_blank">Exception</a>
                      (1 or 2) You must also identify the exception number and alpha subsection. For example
                      "<a href="#" target="_blank">Exception</a> 1d - Pension Income" You also must enter the "treaty country"
                      and "treaty article number"</p>`,
	},
	{
		Id: 2,
		Reason: 'b',
		Text: `<p class="boxcaption__title">Reason B</p>
          <p class="boxcaption__content">Check this box if you're a nonresident alien who is filing a tax return to: 1. Report income 2. Filing a tax return only to get a refund</p>`,
	},
	{
		Id: 3,
		Reason: 'c',
		Text: `<p class="boxcaption__title">Reason C</p>
                      
                  <p class="boxcaption__content">Check this box if you're a foreign individual living in the US who doesn't have permission to work from the UCSIS (thus ineligible for a SSN) and are required to file a tax return</p>`,
	},
	{
		Id: 4,
		Reason: 'd',
		Text: `<p class="boxcaption__title">Reason D</p>
                      
                      <p class="boxcaption__content">Check this box if you are a dependent and are not eligible for a SSN. You must also include the name and SSN of the US Citizen/Resident Alien in the box below</p>`,
	},
	{
		Id: 5,
		Reason: 'e',
		Text: `<p class="boxcaption__title">Reason E</p>
                      
                      <p class="boxcaption__content">Check this box if: 1. You're a spouse of a resident/non-resident alien and your ARE NOT filing a tax return (including joint return), you're not eligible for a SSN, and you are being claimed as an exemption. OR 2. You are a resident/non-resident alien filing a joint tax return with your US Citizen or resident alien spouse. You must also include the the name and SSN of the US Citizen/Resident Alien in the box below.</p>`,
	},
	{
		Id: 6,
		Reason: 'f',
		Text: `<p class="boxcaption__title">Reason F</p>
                      
                      <p class="boxcaption__content">Check this box if you're a student, professor or researcher who has not abandoned their foreign residence and who is in the US temporarily to attend classes, teach or perform research. You must also complete lines: 6c and 6g. **You must attach a copy of the visa to your W7 application (unless you are entering the US from the following countries: Canada, Bermuda, Bahamas, Cayman Islands, or Turks and Caicos Islands.)</p>`,
	},
	{
		Id: 7,
		Reason: 'g',
		Text: `<p class="boxcaption__title">Reason G</p>
                      
          <p class="boxcaption__content">Check this box if you're a foreign individual living in the US who doesn't have permission to work from the UCSIS (thus ineligible for a SSN) and are required to file a tax return</p>`,
	},
	{
		Id: 8,
		Reason: 'h',
		Text: `<p class="boxcaption__title">Reason H</p>
          <p class="boxcaption__content">If you feel the reason you're applying for an ITIN isn't described above, describe in detail why you're requesting an ITIN in this box and make sure to include all supporting documents. Box H is also used for identifying "<a href="#" target="_blank">Exceptions</a>" by it's alpha numberic subsection as well as the category. Example of the correct format for entering an exception: "<a href="#" target="_blank">Exception</a> 1(d) - Pension Income"</p>`,
	},
];

const timeouts = new Map();
const secondTimeouts = new Map();

function onBoxcaptionHover(selector, text) {
	// $(document).on('hover','.reason', function () {

	$(`${selector} p`).html(text);
	$(`${selector}`).addClass(`reason_box_animated`);
	$(`${selector}`).removeClass(`reason_box_animated_reverse`);
	$(`${selector}`).show();
	if (timeouts.get(selector)?.length) {
		clearTimeout(timeouts.get(selector)[0]);
		timeouts.get(selector).shift();
	}

	if (secondTimeouts.get(selector)?.length) {
		clearTimeout(secondTimeouts.get(selector)[0]);
		secondTimeouts.get(selector).shift();
	}
}
function onBoxcaptionBlur(selector) {
	if (!timeouts.get(selector)) timeouts.set(selector, []);
	timeouts.get(selector).push(
		setTimeout(() => {
			$(`${selector}`).removeClass(`reason_box_animated`);
			$(`${selector}`).addClass(`reason_box_animated_reverse`);

			if (!secondTimeouts.get(selector)) secondTimeouts.set(selector, []);
			secondTimeouts.get(selector).push(
				setTimeout(() => {
					$(`${selector}`).hide();
					$(`${selector} p`).html('');
					$(`${selector}`).removeClass(`reason_box_animated_reverse`);
				}, 500)
			);
		}, 200)
	);
}

$('.reason').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var reason = ReasonInfoRepository.filter(
			x => x.Reason == $(this).data('reason')
		)[0];
		onBoxcaptionHover('#reason_box', reason.Text);
	},
	function () {
		onBoxcaptionBlur('#reason_box');
	}
);

$('.reason-label').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var reason = ReasonInfoRepository.filter(
			x => x.Reason == $(this).data('reason')
		)[0];
		onBoxcaptionHover('#reason_box', reason.Text);
	},
	function () {
		onBoxcaptionBlur('#reason_box');
	}
);

$('.reason').click(function () {
	var radioName = $("input[name='reason']:checked").data('reason');
	radioName = 'reason_' + radioName.substring(0, 1).toLowerCase();
	console.log(radioName);
	// var radioValue = $("input[name='reason']:checked").attr('id');

	if (radioName) {
		$(`.hide-row`).removeClass('d-flex');
		$(`.hide-row`).addClass('d-none');
		$(`.row-${radioName}`).addClass('d-flex');
		$(`.row-${radioName}`).removeClass('d-none');

		// $(`.row-${radioName}`).show();
	}
});

let Name1aInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Name</p>
          <p class="boxcaption__content">Enter your legal name on line 1a as it appears on your
          identifying documents. This entry should reflect your name as it'll
          appear on a U.S. federal tax return.</p>`,
	},
];

$('.name-1a').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var name1a = Name1aInfoRepository[0];
		onBoxcaptionHover('#name_1abox', name1a.Text);
	},
	function () {
		onBoxcaptionBlur('#name_1abox');
	}
);

let Name1bInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Name at birth if different</p>
          <p class="boxcaption__content">Enter your name as it appears on your birth certificate
          if it's different from your entry on line 1a.</p>`,
	},
];

$('.name-1b').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var name1b = Name1bInfoRepository[0];
		onBoxcaptionHover('#name_1bbox', name1b.Text);
	},
	function () {
		onBoxcaptionBlur('#name_1bbox');
	}
);

let mailing_2InfoRepository = [
	{
		Text: `<p class="boxcaption__title">Applicant's mailing address</p>
          <p class="boxcaption__content">Enter your complete mailing address on line 2. This is
          the address the IRS will use to return your original documents
          and send written notification of your ITIN application status.</p>`,
	},
];

$('.mailing-2').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var mailing2 = mailing_2InfoRepository[0];
		onBoxcaptionHover('#mailing_2box', mailing2.Text);
	},
	function () {
		onBoxcaptionBlur('#mailing_2box');
	}
);

let foreign3InfoRepository = [
	{
		Text: `<p class="boxcaption__title">Foreign (non-U.S.) address</p>
          <p class="boxcaption__content">Enter your complete foreign (non-U.S.) address in the
          country where you permanently or normally reside, even if it's
          the same as the address on line 2. If you no longer have a
          permanent foreign residence due to your relocation to the United
          States, enter only the foreign country where you last resided on
          line 3. If you're claiming a benefit under an income tax treaty with
          the United States, the income tax treaty country must be the
          same as the country listed on line 3.</p>`,
	},
];

$('.foreign-3').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var foreign_3 = foreign3InfoRepository[0];
		onBoxcaptionHover('#foreign_3box', foreign_3.Text);
	},
	function () {
		onBoxcaptionBlur('#foreign_3box');
	}
);

let birth4InfoRepository = [
	{
		Text: `<p class="boxcaption__title">Birth Information</p>
          <p class="boxcaption__content">Enter your date of birth in the month/day/year (MM/DD/
          YYYY) format. To be eligible for an ITIN, your birth country must be recognized as a
          foreign country by the U.S. Department of State.</p>`,
	},
];

$('.birth-4').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var birth_4 = birth4InfoRepository[0];
		onBoxcaptionHover('#birth_4box', birth_4.Text);
	},
	function () {
		onBoxcaptionBlur('#birth_4box');
	}
);

let country6aInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
          <p class="boxcaption__content">Enter the country or countries (in the case of dual
          citizenship) in which you're a citizen. Enter the complete country
          name; don't abbreviate.</p>`,
	},
];

$('.country-6a').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var country_6a = country6aInfoRepository[0];
		onBoxcaptionHover('#country_6abox', country_6a.Text);
	},
	function () {
		onBoxcaptionBlur('#country_6abox');
	}
);

let other6bInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
          <p class="boxcaption__content">If your country of residence for tax purposes has
          issued you a tax identification number, enter that number on
          line 6b.</p>`,
	},
];

$('.other-6b').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var other_6b = other6bInfoRepository[0];
		onBoxcaptionHover('#other_6bbox', other_6b.Text);
	},
	function () {
		onBoxcaptionBlur('#other_6bbox');
	}
);

let other6cInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
          <p class="boxcaption__content">Enter only U.S. nonimmigrant visa information. Include
          the USCIS classification, number of the U.S. visa, and the
          expiration date in month/day/year format. For example, if you
          have an F-1/F-2 visa with the number 123456 that has an
          expiration date of December 31, 2021, enter “F-1/F-2,” “123456,”
          and “12/31/2021” in the entry space. Individuals in possession of
          an I-20/I-94 document(s) should attach a copy to their Form
          W-7.</p>`,
	},
];

$('.other-6c').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var other_6c = other6bInfoRepository[0];
		onBoxcaptionHover('#other_6cbox', other_6c.Text);
	},
	function () {
		onBoxcaptionBlur('#other_6cbox');
	}
);

let other6dInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
      <p class="boxcaption__content">Check the box indicating the type of document(s)
      you're submitting to prove your identity. Enter the name of the
      state or country or other issuer, the identification number (if any)
      appearing on the document(s), the expiration date, and the date
      on which you entered the United States. Dates must be entered
      in the month/day/year format.</p>`,
	},
];

$('.other-6d').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var other_6d = other6dInfoRepository[0];
		onBoxcaptionHover('#other_6dbox', other_6d.Text);
	},
	function () {
		onBoxcaptionBlur('#other_6dbox');
	}
);

let other6eInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
          <p class="boxcaption__content">If you ever received an ITIN and/or an Internal
          Revenue Service Number (IRSN), check the “Yes” box and
          complete line 6f. If you never had an ITIN or an IRSN, or if you
          don't know your ITIN or IRSN, check the No/Don't know box.
          An IRSN is a nine-digit number issued by the IRS to persons
          who file a return or make a payment without providing a taxpayer
          identification number. You would've been issued this number if
          you filed a U.S. federal tax return and didn't have an SSN. This
          IRSN will appear on any correspondence the IRS sent you
          concerning that return.
          If you're submitting Form W-7 to renew your ITIN, you must
          include your previously assigned ITIN on line 6f to avoid delays
          in processing your Form W-7.</p>`,
	},
];

$('.other-6e').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var other_6e = other6eInfoRepository[0];
		onBoxcaptionHover('#other_6ebox', other_6e.Text);
	},
	function () {
		onBoxcaptionBlur('#other_6ebox');
	}
);

let other6fInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
          <p class="boxcaption__content">If you have an ITIN and/or an IRSN, list them in the
          space(s) provided. Identify your first, middle, and last name
          under which the ITIN and/or IRSN was issued. If you were
          issued more than one IRSN, attach a separate sheet listing all
          the IRSNs you received. On the separate sheet, be sure to write
          your name and “Form W-7” at the top.
          If you're submitting Form W-7 to renew your ITIN, the name
          under which you applied for your ITIN must be included on
          line 6f to avoid delays in processing your Form W-7.
          <b>Note.</b> If you're renewing your ITIN and your legal name has
          changed since the original assignment of your ITIN, you'll need
          to submit documentation to support your legal name change,
          such as your marriage certificate or a court order, which may
          include a divorce decree. Attach supporting documentation to
          Form W-7.</p>`,
	},
];

$('.other-6f').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var other_6f = other6fInfoRepository[0];
		onBoxcaptionHover('#other_6fbox', other_6f.Text);
	},
	function () {
		onBoxcaptionBlur('#other_6fbox');
	}
);

let other6gInfoRepository = [
	{
		Text: `<p class="boxcaption__title">Other Information</p>
          <p class="boxcaption__content">If you checked reason f, you must enter the name of
          the educational institution and the city and state in which it's
          located. You must also enter your length of stay in the United
          States.
          If you're temporarily in the United States for business
          purposes, you must enter the name of the company with whom
          you're conducting your business and the city and state in which
          it's located. You must also enter your length of stay in the United
          States.</p>`,
	},
];

$('.other-6g').hover(
	function () {
		// $(document).on('hover','.reason', function () {
		var other_6g = other6gInfoRepository[0];
		onBoxcaptionHover('#other_6gbox', other_6g.Text);
	},
	function () {
		onBoxcaptionBlur('#other_6gbox');
	}
);

$("input[id='other_documentation']").on('change', function (event) {
	const checked = event.target.checked;
	if (checked) {
		$('#other_type_id_div').show();
		return;
	}
	$('#other_type_id_div').hide();
});

// $("input[name='other_documentation']").click(function () {
// 	var radioValue = $("input[name='id_document_type']:checked").val();
// 	if (radioValue == 'Other') {
// 		$(`#other_type_id_div`).show();
// 	} else {
// 		$(`#other_type_id_div`).hide();
// 	}
// });

$("input[name='itin_or_irsn']").click(function () {
	const itin_or_irsn = $("input[name='itin_or_irsn']:checked").val();
	// var radioValue = $("input[name='itin_or_irsn']:checked").attr('id');
	if (itin_or_irsn === 'itin') {
		$("label[for='itin_or_irsn_no']").html('Enter ITIN');
		$(`.itin_or_irsn_div`).show();
	} else if (itin_or_irsn === 'irsn') {
		$("label[for='itin_or_irsn_no']").html('Enter IRSN');
		$(`.itin_or_irsn_div`).show();
	} else {
		$(`.itin_or_irsn_div`).hide();
	}
});

$('#review').click(function () {
	$(this).hide();
	$('#edit').show();

	$('#applicationfieldset input:radio').hide();
});

$('#edit').click(function () {
	$(this).hide();
	$('#review').show();

	$('#applicationfieldset input:radio').show();
});
