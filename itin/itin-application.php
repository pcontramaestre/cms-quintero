<?php
// Start of the session
if (session_status() == PHP_SESSION_NONE) {
	session_start();
}

// print_r($_SESSION);

// Get the session language, if available, or set it to 'en-US' by default
$formLanguage = isset($_SESSION['user']['language']) ? htmlspecialchars($_SESSION['user']['language'], ENT_QUOTES, 'UTF-8') : 'en-US';

// Includes configuration file to load global variables and settings
require_once __DIR__ . '/../../config/config.php';
require_once __ROOT__ . '/includes/includes.php';
require_once __ROOT__ . '/includes/includes_layouts.php';
require_once __ROOT__ . '/includes/includes_functions.php';
require_once __ROOT__ . '/includes/includes_messages.php';
require_once __ROOT__ . '/includes/includesDAO.php';

// Write the log to the log file (SESSION)
if (isset($_SESSION)) {
	$content = print_r($_SESSION, true);
	$filePath = __DIR__ . '/session_itin_application.txt';
	$errorFilePath = __DIR__ . '/session_itin_application_error_log.txt';
	$source = '/services/get_an_itin/itin-application.php';
	logData($filePath, $content, $source, $errorFilePath);
}

// Check if the user is logged in
checkSession($formLanguage);

// Get user information from the session
$user_id = $_SESSION['user']['id'];
$username = $_SESSION['user']['username'];
$email = isset($_SESSION['user']['email']) ? $_SESSION['user']['email'] : '';
$phone = isset($_SESSION['user']['phone']) ? $_SESSION['user']['phone'] : '';

// Create an instance of the Connection class and establish the connection to the database
$connect = new Connection(); // Create a new Connection object
$conn = $connect->getConnection(); // Get a database connection

// Verificar el correo electrónico antes de continuar
checkEmailVerification($conn, $formLanguage, $username, $email);

$sql = "SELECT id FROM itin_applications WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':email', $email);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
	// Get the itin_application_id
	$itin_application_id = $result['id'];

	// Check if the itin application id has the status 'Closed'
	$sql = "SELECT status FROM itin_summaries WHERE itin_application_id = :itin_application_id AND status != 'Closed'";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(':itin_application_id', $itin_application_id);
	$stmt->execute();
	$result = $stmt->fetch(PDO::FETCH_ASSOC);

	//Check if the itin_application_id exists and does not have the status 'Closed'
	if ($result) {
		$message = "You already have an active ITIN application!";
		echo '<script language = javascript>
			alert("' . $message . '");
			top.location.href="' . URL . '/services/IRS/Form-W-7/itin_application_summary?language=en-US";
			</script>';
		exit();
	}
}

if (isset($_SESSION['price'])) {
	$servicePricing = $_SESSION['price'];
} else {
	$message = "You must select the option of your convenience to continue.";
	echo '<script language = javascript>
			alert("' . $message . '");
			top.location.href="' . URL . '/get_an_itin";
			</script>';
	exit();
}

if ($servicePricing == 20) {
	$selectedOption = 'We complete your Form W-7';
} elseif ($servicePricing == 150) {
	$selectedOption = 'Your ITIN with Tax Return included';
} elseif ($servicePricing == 400) {
	$selectedOption = 'Your ITIN with the formation of a LLC included';
}

// Open HTML
echo '<!DOCTYPE html>';
echo '<html lang="en-US">';

echo '<head>';

// Load Common Resources
loadCommonResources();
echo '<link rel="stylesheet" href="' . URL . '/services/itin/assets/css/itin_application.css">';
echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">';
echo '<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />';
echo '<link rel="stylesheet" href="' . URL . '/services/itin/assets/css/itin_application.css">';
?>

<!--Metadata-->
<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
<link rel="alternate" href="https://applywithquintero.com/itin_application" hreflang="en" />
<link rel="alternate" href="https://applywithquintero.com/es/itin_aplicacion" hreflang="es" />
<link rel="alternate" href="https://applywithquintero.com/pt/itin_aplicacao" hreflang="pt" />
<link rel="alternate" href="https://applywithquintero.com/zh/ITIN税号申请" hreflang="zh" />

<meta name="description"
	content="You can complete this form to apply for a new ITIN or renew an existing one. Just follow the instructions step by step and in a few minutes you will get your W-7 form duly filled out." />
<link rel="canonical" href="https://applywithquintero.com/itin_application" />
<meta name="keywords"
	content="You can complete this form to apply for a new ITIN or renew an existing one. Just follow the instructions step by step and in a few minutes you will get your W-7 form duly filled out." />
<meta name="author" content="Quintero & Associates Inc">
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="es_ES" />
<meta property="og:type" content="website" />
<meta property="og:title" content="ITIN application - Apply for an ITIN with Quintero" />
<meta property="og:description"
	content="You can complete this form to apply for a new ITIN or renew an existing one. Just follow the instructions step by step and in a few minutes you will get your W-7 form duly filled out." />
<meta property="og:url" content="https://applywithquintero.com/itin_application" />
<meta property="og:site_name"
	content="Apply for an ITIN with Quintero. Quintero & Associates Inc is an IRS Certifying Acceptance Agent (CAA)." />
<meta property="article:modified_time" content="2023-01-25T16:44:12+00:00" />
<meta property="og:image" content="https://applywithquintero.com/assets/img/qa_logo.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:label1" content="Est. reading time" />
<meta name="twitter:data1" content="10 minutes" />

<title>ITIN application</title>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S23SLDDL46"></script>
<script>
	window.dataLayer = window.dataLayer || [];

	function gtag() {
		dataLayer.push(arguments);
	}
	gtag('js', new Date());

	gtag('config', 'G-S23SLDDL46');
</script>

</head>

<body>
	<!-- ITIN application -->
	<link rel="stylesheet" type="text/css" href="<?php echo URL; ?>/services/itin/assets/css/itin_application.css">

	<div class="utility_content-container" id="container11">

		<div class="" id="grad1">
			<div class="row justify-content-center mt-0">
				<div class="col-12 col-md-10 text-center p-0 mt-3 mb-2">
					<div class="card px-0 pt-4 pb-0 mt-3 mb-3">
						<h2><strong>Application</strong></h2>
						<p>Star(<span style="color:red">*</span>) = Required Field
						<p class="title__helper">Hover over each section for more
							Information
						</p>
						<div class="row">

							<div class="col-md-12 mx-0">

								<form id="msform" role="form" target="_blank" method="post" novalidate
									action="<?php echo URL; ?>/services/itin/generate-form">

									<!-- progressbar -->
									<ul id="progressbar" class="text-center">
										<li class="active" id="account"><strong>Fill out form</strong></li>
										<li id="personal"><strong>Review</strong></li>
										<li id="payment"><strong>Payment</strong></li>
										<li id="confirm"><strong>Complete</strong></li>
									</ul>

									<div class="row">
										<div id="errorlist" class="col-md-12" style="display: none;">

										</div>
									</div>

									<!-- fieldsets -->
									<input type="hidden" id="payer_id" name="payer_id" value="<?= uniqid() ?>" />

									<!-- <hr> -->

									<fieldset id="applicationfieldset" class="container">
										<!-- ApplicSSation Type -->
										<div class="row">
											<h6>Application Type<span style="color:red">*</span>
												(Check one box)
											</h6>

										</div>
										<div class="d-flex justify-content-start gap-3 mb-3">
											<div class="d-flex gap-2 form-check align-items-center">
												<input required type="radio" class="m-0 form-check-input flex-shrink-0"
													id="newitin" checked name="itin_type" value="new" />
												<label for="newitin" class="form-check-label">Apply For A New
													ITIN</label>
											</div>
											<div class="d-flex gap-2 form-check align-items-center">
												<input required type="radio" class="m-0 form-check-input flex-shrink-0"
													id="renewitin" name="itin_type" value="renew" />
												<label for="renewitin" class="form-check-label">Renew An Existing
													ITIN</label>
											</div>
										</div>

										<!-- <hr> -->

										<!-- Reason You're Submitting Form W-7 -->
										<div class="row">

											<h6>Reason You're Submitting Form W-7<span style="color:red">*</span><br>
												If you check box b, c, d, e, f, or g, you must file a U.S federal
												tax return with Form w-7 unless you meet one of the exceptions
											</h6>

											<div class="col-md-9">
												<div class="d-flex flex-column gap-3">
													<div class="d-flex flex-column gap-3">
														<div
															class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
															<input class="reason form-check-input flex-shrink-0"
																data-reason="a" required type="radio" id="reason_a"
																name="reason" value="a" />
															<label class="reason-label form-check-label" data-reason="a"
																for="reason_a">A.
																Nonresident Alien Required To Get An
																ITIN To Claim Tax Treaty Benefit</label>
														</div>

														<div
															class="row-reason_a  flex-column px-5 hide-row justify-content-center gap-3 d-none">
															<div class="form-floating">



																<input type="text" class="form-control m-0"
																	id="treaty_country_for_nonresident"
																	name="treaty_country_for_nonresident"
																	placeholder="Treaty Country">
																<label for="treaty_country_for_nonresident">Treaty
																	Country</label>
															</div>
															<div class="form-floating">

																<input type="text" class="form-control  m-0"
																	id="treaty_article_for_nonresident"
																	name="treaty_article_for_nonresident"
																	placeholder="Treaty Article Number">
																<label for="treaty_article_for_nonresident">Treaty
																	Article Number</label>
															</div>
														</div>


													</div>
													<div
														class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
														<input class="reason form-check-input flex-shrink-0" required
															type="radio" data-reason="b" id="reason_b" name="reason"
															value="b" />
														<label class="reason-label form-check-label" data-reason="b"
															for="reason_b">B. Nonresident Alien Filing A U.S. Federal
															Tax Return</label>
													</div>
													<div
														class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
														<input class="reason form-check-input flex-shrink-0" required
															type="radio" data-reason="c" id="reason_c" name="reason"
															value="c" />
														<label class="reason-label form-check-label" data-reason="c"
															for="reason_c">C. U.S. Resident Alien (Based On Days
															Present In The United States) Filing A U.S Federal Tax
															Return</label>
													</div>
													<div class="d-flex flex-column gap-3">
														<div
															class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
															<input class="reason form-check-input flex-shrink-0"
																data-reason="d" required type="radio" id="reason_d"
																name="reason" value="d" />
															<label class="reason-label form-check-label" data-reason="d"
																for="reason_d">D. Dependent Of U.S. Citizen/Resident
																Alien</label>
														</div>
														<div
															class="row-reason_d flex-column hide-row justify-content-center gap-3 px-5 d-none">
															<div class="form-floating">


																<input type="text" class="form-control"
																	id="relationship_to_us_citizen"
																	name="relationship_to_us_citizen"
																	placeholder="Relationship To U.S Citizen/Resident Alien">
																<label for="relationship_to_us_citizen">Relationship To
																	U.S Citizen/Resident Alien</label>

															</div>

															<div class="form-floating">

																<input type="text" class="form-control"
																	id="identification_for_us_citizen"
																	name="relative_info"
																	placeholder="Name And SSN/ITIN Of U.S Citizen/Resident Alien">
																<label for="identification_for_us_citizen">Name And
																	SSN/ITIN Of U.S
																	Citizen/Resident Alien</label>

															</div>


														</div>
													</div>


													<div class="d-flex flex-column gap-3">
														<div
															class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
															<input class="reason form-check-input flex-shrink-0"
																required type="radio" data-reason="e" id="reason_e"
																name="reason" value="e" />
															<label class="reason-label form-check-label" data-reason="e"
																for="reason_e">E. Spouse Of U.S. Citizen/Resident
																Alien</label>
														</div>

														<div
															class="row-reason_e flex-column px-5 hide-row justify-content-center gap-3 d-none">
															<div class="form-floating">

																<input type="text" class="form-control" id="spouse_info"
																	name="spouse_info"
																	placeholder="Name And SSN/ITIN Of U.S Citizen/Resident Alien">
																<label for="spouse_info">Name And SSN/ITIN Of U.S
																	Citizen/Resident Alien</label>
															</div>
														</div>


													</div>

													<div class="d-flex flex-column gap-3">
														<div
															class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
															<input class="reason form-check-input flex-shrink-0"
																data-reason="f" required type="radio" id="reason_f"
																name="reason" value="f" />
															<label class="reason-label form-check-label" data-reason="f"
																for="reason_f">F. Nonresident Alien Student, Professor,
																Or
																Researcher Filing A U.S Federal Tax Return Or Claiming
																An Exception</label>
														</div>
														<div
															class="row-reason_f flex-column px-5 hide-row justify-content-center gap-3 d-none">
															<div class="form-floating">
																<input type="text" class="form-control"
																	id="treaty_country_for_nonresident_spr"
																	name="treaty_country_for_nonresident_spr"
																	placeholder="Treaty Country">
																<label for="treaty_country_for_nonresident_spr">Treaty
																	Country</label>

															</div>
															<div class="form-floating">
																<input type="text" class="form-control"
																	id="treaty_article_for_nonresident_spr"
																	name="treaty_article_for_nonresident_spr"
																	placeholder="Treaty Article Number">
																<label for="treaty_article_for_nonresident_spr">Treaty
																	Article Number</label>
															</div>
														</div>
													</div>

													<div
														class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
														<input class="reason form-check-input flex-shrink-0" checked
															required type="radio" id="reason_g" name="reason"
															data-reason="g" value="g" />
														<label class="reason-label form-check-label" data-reason="g"
															for="reason_g">G. Dependent/Spouse Of A Nonresident Alien
															Holding A U.S. Visa</label>
													</div>
													<div class="d-flex flex-column gap-3">
														<div
															class="d-flex justify-content-start gap-3 form-check align-items-center ms-4">
															<input class="reason form-check-input flex-shrink-0"
																required type="radio" data-reason="h" id="reason_h"
																name="reason" value="h" />
															<label class="reason-label form-check-label" data-reason="h"
																for="reason_h">H. Other</label>
														</div>
														<div
															class="row-reason_h hide-row justify-content-center gap-3 d-none px-5">
															<div class="form-floating w-100">
																<input type="text" class="form-control" id="other_info"
																	name="other_info"
																	placeholder="Others (See instructions)">
																<label for="other_info">Others (See
																	instructions)</label>
															</div>
														</div>

													</div>

												</div>


												<!-- boxcaption -->

											</div>
											<div class="col-md-3">
												<div id="reason_box" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>

											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="next2" class="next2 action-button"
														value="Next Step" />
												</div>
											</div>
										</div>

									</fieldset>

									<!-- fieldsets -->

									<!-- fieldsets for name, 1a and 1b -->
									<fieldset class="container">
										<!-- Name (1a) -->
										<input type="hidden" id="formLanguage" value="<?php echo $formLanguage; ?>">

										<h4>Name (1a)</h4>
										<div class="row mb-3">
											<div class="col-md-9">
												<div class="d-flex flex-column gap-3 ms-4">
													<div class="form-floating">
														<input required type="text" class="form-control name-1a"
															id="first_name" name="first_name" placeholder="First Name">
														<label for="first_name" class="form-label name-1a">First Name
															<span style="color:red">*</span></label>
													</div>
													<div class="form-floating">
														<input type="text" class="form-control name-1a" id="middle_name"
															name="middle_name" placeholder="Middle Name">
														<label for="middle_name" class="form-label name-1a">Middle
															Name</label>
													</div>
													<div class="form-floating">
														<input required type="text" class="form-control name-1a"
															id="last_name" name="last_name" placeholder="Last Name">
														<label for="last_name" class="form-label name-1a">Last Name
															<span style="color:red">*</span></label>
													</div>
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3">
												<div id="name_1abox" class="boxcaption" style="display: none;">
													<p>

													</p>
												</div>
											</div>
										</div>

										<!-- Name at Birth if Different (1b) -->
										<h4>Name at Birth if Different (1b)</h4>
										<div class="row">
											<div class="col-md-9">
												<div class="d-flex flex-column gap-3 ms-4">
													<div class="form-floating">

														<input type="text" class="form-control name-1b"
															id="first_name_at_birth" name="first_name_at_birth"
															placeholder="First Name at Birth">
														<label for="first_name_at_birth"
															class="name-1b form-label">First
															Name at Birth</label>
													</div>
													<div class="form-floating">
														<input type="text" class="form-control name-1b"
															id="middle_name_at_birth" name="middle_name_at_birth"
															placeholder="Middle Name at Birth">
														<label for="middle_name_at_birth"
															class="name-1b form-label">Middle
															Name</label>

													</div>
													<div class="form-floating">
														<input type="text" class="form-control name-1b"
															id="last_name_at_birth" name="last_name_at_birth"
															placeholder="Last Name at Birth">
														<label for="last_name_at_birth" class="name-1b form-label">Last
															Name</label>

													</div>
												</div>

											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="name_1bbox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
										</div>
										<!-- <input type="button" name="previous2" class="previous2 action-button-previous"
											value="Previous" />
										<input type="button" name="next2" class="next2 action-button"
											value="Next Step" /> -->
										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous2"
														class="previous2 action-button-previous" value="Previous" />
													<input type="button" name="next2" class="next2 action-button"
														value="Next Step" />
												</div>
											</div>
										</div>
									</fieldset>

									<!-- fieldset for addresses, 2 and 3 -->
									<fieldset class="container">
										<!-- Applicant's Mailing Address (2) -->
										<h4>Applicant's Mailing Address (2)</h4>
										<div class="row ms-4">
											<div class="col-md-9">
												<div class="form-group mb-3">
													<label for="us_address_line1" class=" mailing-2 form-label">
														Street address, apartment number, or rural route number <span
															style="color:red">*</span>
														<!-- <span style="color:red">*</span> -->
													</label>
													<input required type="text" class="mailing-2 form-control"
														id="us_address_line1" name="us_address_line1"
														placeholder="Street"
														onkeyup="this.value=TextAndNumbers(this.value)">
												</div>
												<div class="d-flex flex-column gap-2 mb-3">
													<label for="us_city" class="mailing-2">City
														or town, state or province.
														Include ZIP code or postal code where appropriate
													</label>

													<div class="input-group">
														<label for="us_city" class="input-group-text"><span
																style="color:red">*</span></label>
														<input placeholder="City" required type="text"
															class="mailing-2 form-control" id="us_city" name="us_city"
															onkeyup="this.value=capitalizeFirstLetter(this.value)">
														<label for="us_state" class="input-group-text"><span
																style="color:red">*</span></label>
														<select required class="mailing-2 form-control form-sm valid"
															id="us_state" name="us_state" aria-required="true"
															aria-describedby="State-error" aria-invalid="false">
															<option selected>State</option>
															<!-- <option value="1">Venezuela</option> -->
															<?php
															$usStates = getUSStates($formLanguage, $conn);
															// Recorre los estados y muestra cada uno en una opción del select
															foreach ($usStates as $usState) {
																echo '<option value="' . $usState['iso_code'] . '">' . $usState['name'] . '</option>';
															}
															?>
														</select>
														<label for="us_zip_code" class="input-group-text"><span
																style="color:red">*</span></label>
														<input placeholder="ZIP code" required type="text"
															class="mailing-2 form-control" id="us_zip_code"
															name="us_zip_code"
															onkeyup="this.value=TextAndNumbers(this.value)">
													</div>
												</div>
												<div class="form-group mb-3">
													<label for="us_phone" class="mailing-2 form-label">Main
														Contact Phone Number <span style="color:red">*</span>
													</label>
													<input type="tel" class="mailing-2 form-control" id="us_phone"
														name="us_phone" placeholder="e.g. 3055555555" maxlength="10"
														onkeypress="return valideKey(event);">
													<span class="flag-icon flag-icon-us"></span>
												</div>

											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="mailing_2box" class="boxcaption" style="display: none;">
													<p>

													</p>
												</div>
											</div>
										</div>
										<!-- <hr> -->

										<!-- Foreign (non-U.S.) Address (3) -->
										<h4>Foreign (non-U.S.) Address (3)</h4>
										<div class="row ms-4">
											<div class="col-md-9">
												<div class="form-group mb-3">
													<label for="non_us_address_line1"
														class="foreign-3 form-label">Foreign (Non-US)
														Address
														Street address, apartment number, or rural route number.
														Don't use a P.O. box number
													</label>
													<input placeholder="Street" type="text"
														class="foreign-3 form-control" id="non_us_address_line1"
														name="non_us_address_line1"
														onkeyup="this.value=TextAndNumbers(this.value)">
												</div>
												<div class="d-flex flex-column gap-2 mb-3">
													<!-- Col 1 -->
													<label for="non_us_city" class="foreign-3">City or town, state
														or province.
														Include ZIP code or postal code where appropriate
													</label>
													<!-- Col 2 -->
													<div class="input-group">
														<input placeholder="City" type="text"
															class="foreign-3 form-control" id="non_us_city"
															name="non_us_city"
															onkeyup="this.value=capitalizeFirstLetter(this.value)">
														<select class="foreign-3 form-control form-sm valid"
															id="non_us_country" name="non_us_country"
															aria-required="true" aria-describedby="Country-error"
															aria-invalid="false">
															<option value="">Country</option>
															<?php
															$countries = getCountriesWithoutUS($formLanguage, $conn);
															// Recorre los estados y muestra cada uno en una opción del select
															foreach ($countries as $country) {
																echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
															}
															?>
														</select>
														<select class="foreign-3 form-control form-sm valid"
															id="non_us_state" name="non_us_state" aria-required="true"
															aria-describedby="State-error" aria-invalid="false">
															<option value="">Select State</option>

														</select>
													</div>

													<div class="form-group">

														<label for="non_us_zip_code" class="form-label">ZIP
															Code</label>
														<input placeholder="ZIP Code" type="text"
															class="foreign-3 form-control" id="non_us_zip_code"
															name="non_us_zip_code">
													</div>

													<div class="d-flex flex-column gap-2">
														<label>Country Code and Main Contact Phone
															Number</label>
														<div class="foreign-phone-number">
															<select
																class="form-select foreign-phone-number__country-code"
																id="non_us_country_phone_code"
																name="non_us_country_phone_code">
																<option value="">Country Code</option>
															</select>
															<input type="tel"
																class="form-control foreign-phone-number__phone"
																id="non_us_phone" name="non_us_phone"
																placeholder="Phone Number" maxlength="15"
																onkeypress="return valideKey(event);">
														</div>
													</div>

													<div class="col-sm-3">
														<span class="field-validation-valid alert-danger"></span>
													</div>
												</div>



											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="foreign_3box" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
										</div>
										<!-- <hr> -->

										<!-- <input type="button" name="previous2" class="previous2 action-button-previous"
											value="Previous" />
										<input type="button" name="next2" class="next2 action-button"
											value="Next Step" /> -->


										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous2"
														class="previous2 action-button-previous" value="Previous" />
													<input type="button" name="next2" class="next2 action-button"
														value="Next Step" />
												</div>
											</div>
										</div>

									</fieldset>

									<!-- fieldsets for birth information, 4 -->
									<fieldset class="container">
										<!-- Birth Information (4) -->
										<h4>Birth Information (4)</h4>
										<div class="row ms-4">
											<div class="col-md-9">
												<div class="d-md-flex gap-3">
													<div class="form-group flex-fill  mb-3">
														<label for="date_of_birth" class="birth-4 form-label">Date Of
															Birth <span style="color:red">*</span></label>
														<input required type="date" class="birth-4 form-control"
															id="date_of_birth" name="date_of_birth">
													</div>

													<div class="form-group flex-fill  mb-3">
														<label for="country_of_birth" class="birth-4 form-label">Country
															Of
															Birth <span style="color:red">*</span></label>
														<select class="birth-4 form-select valid" id="country_of_birth"
															name="country_of_birth" aria-required="true"
															aria-describedby="Country-error" aria-invalid="false">
															<?php
															$countries = getCountries($formLanguage, $conn);
															// Recorre los estados y muestra cada uno en una opción del select
															echo '<option value="">Country</option>';

															foreach ($countries as $country) {
																echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
															}
															?>
														</select>
													</div>
												</div>
												<div class="d-md-flex gap-3">
													<div class="d-flex flex-column gap-2  mb-3">
														<label for="birth_city" class="birth-4 form-label">City
															And State Or Province</label>
														<div class="input-group">
															<input type="text" class="name-1b form-control"
																id="birth_city" name="birth_city" placeholder="City"
																onkeyup="this.value=capitalizeFirstLetter(this.value)">
															<select class="birth-4 form-select form-sm valid"
																id="birth_state" name="birth_state" aria-required="true"
																aria-describedby="State-error" aria-invalid="false">
																<option value="">State</option>
															</select>
														</div>
													</div>
													<div class="d-flex flex-column gap-2">
														<label for="gender" class="form-label">Gender <span
																style="color:red">*</span> (5)</label>
														<div class="d-flex gap-2">
															<div class="form-check">
																<input required type="radio" id="male" name="gender"
																	value="male" class="form-check-input flex-shrink-0"
																	checked><label class="form-check-label"
																	for="male">Male</label>

															</div>

															<div class="form-check">
																<input required type="radio" id="female" name="gender"
																	value="female"
																	class="form-check-input flex-shrink-0"><label
																	class="form-check-label" for="female">Female</label>
															</div>
														</div>
													</div>
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="birth_4box" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
										</div>

										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous2"
														class="previous2 action-button-previous" value="Previous" />
													<input type="button" name="next2" class="next2 action-button"
														value="Next Step" />
												</div>
											</div>
										</div>

									</fieldset>

									<!-- fieldsets for other information, from 6a and up to 6g -->
									<fieldset class="container">
										<!-- Other Information -->
										<h4>Other Information</h4>
										<div class="row ms-4">
											<div class="col-md-9">
												<div class="form-group mb-3">
													<label for="country_of_citizenship"
														class="country-6a form-label">Country(ies) Of
														Citizenship <span style="color:red">*</span> (6a)</label>
													<select class="country-6a form-select" id="country_of_citizenship"
														name="country_of_citizenship[]" aria-required="true"
														aria-describedby="Country-error" aria-invalid="false" multiple>
														<?php
														$countries = getCountries($formLanguage, $conn);
														// Recorre los estados y muestra cada uno en una opción del select
														foreach ($countries as $country) {
															echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
														}
														?>
													</select>
												</div>
											</div>
											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="country_6abox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
											<div class="col-md-9">
												<div class="form-group mb-3">
													<label for="foreign_tax_id" class="other-6b form-label">Foreign Tax
														I.D. Number
														(If Any) (6b)</label>
													<input type="text" class="other-6b form-control" id="foreign_tax_id"
														name="foreign_tax_id">
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="other_6bbox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
											<div class="col-md-9">
												<div class="d-flex flex-column gap-2 mb-3">

													<label for="visa_info" class="other-6c form-label">Type
														Of U.S. Visa (If Any), Number, And Expiration Date (6c)</label>
													<div class="input-group">

														<select required class="form-select other-6c" id="us_visa_type"
															name="us_visa_type">
															<option selected value="">Visa</option>
															<?php
															$usVisas = getUSVisas($conn);
															// Recorre los estados y muestra cada uno en una opción del select
															foreach ($usVisas as $usVisa) {
																echo '<option value="' . $usVisa . '">' . $usVisa . '</option>';
															}
															?>
														</select>
														<input placeholder="Number" required type="text"
															class="form-control other-6c" id="us_visa_number"
															name="us_visa_number">
														<input required type="date" class="form-control other-6c"
															id="us_visa_exp_date" name="us_visa_exp_date">
													</div>
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="other_6cbox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
											<div class="col-md-9">
												<div class="d-flex flex-column flex-wrap gap-2 mb-3">
													<label for="id_document_type" class="form-label">Identification
														Document(s) Submitted <span style="color:red">*</span>
														(6d)</label>
													<div id="documents">
														<div class="document-container card-document">
															<div class="form-check d-flex gap-1">
																<input required
																	class="form-check-input flex-shrink-0 other-6d"
																	type="checkbox" id="passport"
																	name="id_document_type[]" value="0">
																<label class="form-check-label"
																	for="passport">Passport</label>
															</div>
															<div class="card-body d-none">
																<div class="input-group">
																	<div class="form-floating">
																		<select class="form-select other-6d" disabled
																			required id="passport_issued_by"
																			name="passport_issued_by"
																			aria-required="true"
																			aria-describedby="Country-error"
																			aria-invalid="false">
																			<?php
																			echo '<option value="">Country</option>';
																			$countries = getCountries($formLanguage, $conn);
																			// Recorre los estados y muestra cada uno en una opción del select
																			foreach ($countries as $country) {
																				echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
																			}
																			?>
																		</select>
																		<label for="passport_issued_by">Issued
																			By <span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="text"
																			class="form-control other-6d"
																			id="passport_number" name="passport_number"
																			placeholder="Passport Number">
																		<label for="passport_number">Number <span
																				style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="date"
																			class="form-control other-6d"
																			id="passport_exp_date"
																			name="passport_exp_date"
																			placeholder="Expiration Date">
																		<label for="passport_exp_date">Expiration
																			Date <span
																				style="color:red">*</span></label>
																	</div>
																</div>
															</div>

														</div>

														<div class="document-container card-document">
															<div class="form-check  d-flex gap-1">
																<input required
																	class="form-check-input flex-shrink-0 other-6d"
																	type="checkbox" id="drivers_license"
																	name="id_document_type[]" value="1">
																<label class="form-check-label"
																	for="drivers_license">Driver's license</label>
															</div>

															<div class="card-body d-none">
																<div class="input-group">
																	<div class="form-floating">
																		<select class="form-select other-6d" disabled
																			required id="drivers_license_issued_by"
																			name="drivers_license_issued_by"
																			aria-required="true"
																			aria-describedby="Country-error"
																			aria-invalid="false">
																			<option value="">Country</option>
																			<?php
																			$countries = getCountries($formLanguage, $conn);
																			// Recorre los estados y muestra cada uno en una opción del select
																			echo '<option value="">Country</option>';
																			foreach ($countries as $country) {
																				echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
																			}
																			?>
																		</select>
																		<label for="drivers_license_issued_by">Issued
																			By <span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="text"
																			class="form-control other-6d"
																			id="drivers_license_number"
																			name="drivers_license_number"
																			placeholder="Driver's License Number">
																		<label for="drivers_license_number">Number <span
																				style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="date"
																			class="form-control other-6d"
																			id="drivers_license_exp_date"
																			name="drivers_license_exp_date"
																			placeholder="Expiration Date">
																		<label for="drivers_license_exp_date">Expiration
																			Date <span
																				style="color:red">*</span></label>
																	</div>
																</div>
															</div>

														</div>

														<div class="document-container card-document">
															<div class="form-check  d-flex gap-1">
																<input required
																	class="form-check-input flex-shrink-0 other-6d"
																	type="checkbox" id="state_id"
																	name="id_document_type[]" value="2">

																<label class="form-check-label" for="state_id">
																	State ID</label>
															</div>

															<div class="card-body d-none">
																<div class="input-group">
																	<div class="form-floating">
																		<select class="form-select other-6d" disabled
																			required id="state_id_issued_by"
																			name="state_id_issued_by"
																			aria-required="true"
																			aria-describedby="Country-error"
																			aria-invalid="false">
																			<option value="">Country</option>
																			<?php
																			$countries = getCountries($formLanguage, $conn);
																			echo '<option value="">Country</option>';
																			// Recorre los estados y muestra cada uno en una opción del select
																			foreach ($countries as $country) {
																				echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
																			}
																			?>
																		</select>
																		<label for="state_id_issued_by">Issued
																			By <span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="text"
																			class="form-control other-6d"
																			id="state_id_number" name="state_id_number"
																			placeholder="State ID Number">
																		<label for="state_id_number">Number <span
																				style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="date"
																			class="form-control other-6d"
																			id="state_id_exp_date"
																			name="state_id_exp_date"
																			placeholder="Expiration Date">
																		<label for="state_id_exp_date">Expiration
																			Date <span
																				style="color:red">*</span></label>
																	</div>
																</div>
															</div>
														</div>
														<div class="document-container card-document">
															<div class="form-check  d-flex gap-1">
																<input required
																	class="form-check-input flex-shrink-0 other-6d"
																	type="checkbox" id="uscis_documentation"
																	name="id_document_type[]" value="3">
																<label class="form-check-label"
																	for="uscis_documentation">USCIS
																	documentation</label>
															</div>

															<div class="card-body d-none">
																<div class="input-group">
																	<div class="form-floating">
																		<input disabled required type="text"
																			class="form-control other-6d"
																			id="uscis_documentation_type"
																			name="uscis_documentation_type"
																			placeholder="USCIS Documentation Type">
																		<label for="uscis_documentation_type">Type <span
																				style="color:red">*</span></label>
																	</div>
																	<div class="form-floating">
																		<select class="form-select other-6d" disabled
																			required id="uscis_documentation_issued_by"
																			name="uscis_documentation_issued_by"
																			aria-required="true"
																			aria-describedby="Country-error"
																			aria-invalid="false">
																			<option value="">Country</option>
																			<?php
																			$countries = getCountries($formLanguage, $conn);
																			echo '<option value="">Country</option>';
																			// Recorre los estados y muestra cada uno en una opción del select
																			foreach ($countries as $country) {
																				echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
																			}
																			?>
																		</select>
																		<label
																			for="uscis_documentation_issued_by">Issued
																			By <span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled required type="text"
																			class="form-control other-6d"
																			id="uscis_documentation_number"
																			name="uscis_documentation_number"
																			placeholder="USCIS Documentation Number">
																		<label for="uscis_documentation_number">Number
																			<span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled type="date"
																			class="form-control other-6d"
																			id="uscis_documentation_exp_date"
																			name="uscis_documentation_exp_date"
																			placeholder="Expiration Date">
																		<label
																			for="uscis_documentation_exp_date">Expiration
																			Date</label>
																	</div>
																</div>
															</div>
														</div>
														<div class="document-container card-document">
															<div class="form-check  d-flex gap-1">
																<input required
																	class="form-check-input flex-shrink-0 other-6d"
																	type="checkbox" id="other_documentation"
																	name="id_document_type[]" value="4">
																<label class="form-check-label"
																	for="other_documentation">Other</label>
															</div>

															<div class="card-body d-none">
																<div class="input-group">
																	<div class="form-floating">
																		<input disabled required type="text"
																			class="form-control other-6d"
																			id="other_documentation_type"
																			name="other_documentation_type"
																			placeholder="Other Documentation Type">
																		<label for="other_documentation_type">Type
																			<span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<select class="form-select other-6d" disabled
																			required id="other_documentation_issued_by"
																			name="other_documentation_issued_by"
																			aria-required="true"
																			aria-describedby="Country-error"
																			aria-invalid="false">
																			<option value="">Country</option>
																			<?php
																			$countries = getCountries($formLanguage, $conn);
																			echo '<option value="">Country</option>';
																			// Recorre los estados y muestra cada uno en una opción del select
																			foreach ($countries as $country) {
																				echo '<option value="' . $country['alpha2_code'] . '">' . $country['name'] . '</option>';
																			}
																			?>
																		</select>
																		<label
																			for="other_documentation_issued_by">Issued
																			By <span style="color:red">*</span></label>
																	</div>

																	<div class="form-floating">
																		<input disabled type="text"
																			class="form-control other-6d"
																			id="other_documentation_number"
																			name="other_documentation_number"
																			placeholder="Other Documentation Number">
																		<label
																			for="other_documentation_number">Number</label>
																	</div>

																	<div class="form-floating">
																		<input disabled type="date"
																			class="form-control other-6d"
																			id="other_documentation_exp_date"
																			name="other_documentation_exp_date"
																			placeholder="Expiration Date">
																		<label
																			for="other_documentation_exp_date">Expiration
																			Date</label>
																	</div>
																</div>
															</div>
														</div>
													</div>



													<div class="form-group">
														<label for="entry_date" class="other-6d form-label">Date Of
															Entry Into
															The United States</label>
														<input type="date" class="other-6d form-control" id="entry_date"
															name="entry_date">
													</div>
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3">
												<div id="other_6dbox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
											<div class="col-md-9">
												<div class="mb-3 d-flex flex-column gap-2">
													<label for="itin_or_irsn" class="form-label other-6e">Have You
														Previously
														Received An ITIN Or An Internal Revenue Service Number
														(IRSN)?<span style="color:red">*</span> (6e)</label>
													<div class="d-flex gap-3">
														<div class="form-check">
															<input required
																class="other-6e form-check-input flex-shrink-0"
																type="radio" id="not_received" name="itin_or_irsn"
																value="Not disclosure" checked>
															<label class="form-check-label" for="not_received">No/Don't
																Know</label>
														</div>
														<div class="form-check">
															<input required
																class="other-6e form-check-input flex-shrink-0"
																type="radio" id="receivec_itin" name="itin_or_irsn"
																value="itin">
															<label class="form-check-label" for="receivec_itin">Yes
																ITIN</label>
														</div>
														<div class="form-check">
															<input required
																class="other-6e form-check-input flex-shrink-0"
																type="radio" id="received_irsn" name="itin_or_irsn"
																value="irsn">
															<label class="form-check-label" for="received_irsn">Yes
																IRSN</label>
														</div>
													</div>
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="other_6ebox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
											<div class="itin_or_irsn_div col-md-9" style="display: none;">
												<div class="mb-3 form-group">
													<label for="itin_or_irsn_no" class="other-6f">Enter
														ITIN<span style="color:red">*</span> (6f)</label>
													<input type="text" pattern="\d*" maxlength="9"
														class="other-6f form-control" id="itin_or_irsn_no"
														name="itin_or_irsn_no">
												</div>

												<div class="mb-3 input-group">
													<div class="form-floating">
														<input type="text" class="other-6f form-control"
															id="itin_or_irsn_first_name" name="itin_or_irs_first_name"
															placeholder="First Name">
														<label for="itin_or_irsn_first_name" class="other-6f">First
															Name <span style="color:red">*</span></label>
													</div>
													<div class="form-floating">
														<input type="text" class="other-6f form-control"
															id="itin_or_irsn_middle_name" name="itin_or_irs_middle_name"
															placeholder="Middle Name">
														<label for="itin_or_irsn_middle_name" class="other-6f">Middle
															Name</label>
													</div>
													<div class="form-floating">
														<input type="text" class="other-6f form-control"
															id="itin_or_irsn_last_name" name="itin_or_irs_last_name"
															placeholder="Last Name">
														<label for="itin_or_irsn_last_name"
															class="other-6f form-label">Last
															Name <span style="color:red">*</span></label>

													</div>
												</div>
											</div>

											<!-- boxcaption -->
											<div class="itin_or_irsn_div col-md-3 " style="display: none;">
												<div id="other_6fbox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
											<div class="col-md-9">
												<div class="mb-3 form-group">
													<label for="college_univ_company" class="form-label other-6g">Name
														Of
														College/University Or Company</label>
													<input type="text" class="other-6g form-control"
														id="college_univ_company" name="college_univ_company"
														placeholder="University Or Company"
														onkeyup="this.value=capitalizeEveryWord(this.value)">
												</div>


												<div class="mb-3 d-flex flex-column gap-2">
													<label for="college_univ_company_city"
														class="form-label other-6g">City And State</label>
													<div class="input-group">
														<label for="college_univ_company_city"
															class="input-group-text">City</label>
														<input type="text" class="name-1b form-control"
															id="college_univ_company_city"
															name="college_univ_company_city" placeholder="City"
															onkeyup="this.value=capitalizeFirstLetter(this.value)">
														<label for="college_univ_company_state"
															class="input-group-text">State</label>
														<select class="other-6g form-select"
															id="college_univ_company_state"
															name="college_univ_company_state" aria-required="true"
															aria-describedby="State-error" aria-invalid="false">
															<option value="">State</option>
															<?php
															$usStates = getUSStates($formLanguage, $conn);
															// Recorre los estados y muestra cada uno en una opción del select
															foreach ($usStates as $usState) {
																echo '<option value="' . $usState['iso_code'] . '">' . $usState['name'] . '</option>';
															}
															?>
														</select>
													</div>
												</div>
												<div class="mb-3 form-group">
													<label for="length_of_stay" class="form-label other-6g">Length
														Of
														Stay</label>
													<input type="text" class="other-6g form-control" id="length_of_stay"
														name="length_of_stay" onkeypress="return valideKey(event);">
												</div>
											</div>

											<!-- boxcaption -->
											<div class="col-md-3 ">
												<div id="other_6gbox" class="boxcaption" style="display: none;">
													<p>
													</p>
												</div>
											</div>
										</div>

										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous2"
														class="previous2 action-button-previous" value="Previous" />
													<input type="button" name="next2" class="next2 action-button"
														value="Next Step" />
												</div>
											</div>
										</div>

									</fieldset>

									<!-- fieldsets -->
									<fieldset class="container">
										<!-- Enter your email -->
										<div class="d-flex flex-column gap-3">
											<h4>Enter your email</h4>
											<p>This is where you are going to receive your W-7 form and
												instructions</p>
										</div>
										<div class="row">
											<div class="col-md-9">
												<div class="form-floating mb-3">
													<input required type="email" class="form-control" id="email"
														name="email" value="<?php echo $email; ?>" placeholder="Email"
														readonly>
													<label for="email">Email<span style="color:red">*</span></label>

												</div>
												<div class="form-floating mb-3">
													<input type="email" class="form-control" id="confirm_email"
														name="confirm_email" placeholder="Confirm Email">
													<label for="confirm_email">Confirm
														Email<span style="color:red">*</span></label>

												</div>
												<input type="hidden" name="itin_application_form_language"
													value="<?php echo $formLanguage; ?>">
											</div>
											<div class="col-md-3 ">
												<div class="boxcaption" style="display: none;">
													<p>

													</p>
												</div>
											</div>
										</div>

										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous2"
														class="previous2 action-button-previous" value="Previous" />
													<input type="button" name="next" id="review-button"
														class="next action-button" value="Next Step" />
												</div>
											</div>
										</div>

									</fieldset>

									<!-- fieldsets -->
									<fieldset class="container">
										<h2 class="review-title text-center mb-3">Review Information</h2>
										<div class="row">
											<div class="col-md-8 offset-md-2">
												<div id="review_table_view"></div>
											</div>

											<div class="d-flex justify-content-center gap-2">
												<div class="form-check">
													<input type="checkbox" id="certify_info_itin_application"
														class="form-check-input flex-shrink-0"
														name="certify_info_itin_application" required>
													<label for="certify_info_itin_application"
														class="form-check-label">I
														certify to the best of
														my
														knowledge that this information is true.</label>
												</div>
											</div>
											<!--
	<div class="form-group form-check mt-3">
												<input type="checkbox" class="form-check-input flex-shrink-0" id="review-information" name="review-information">
												<label class="form-check-label" for="review-information">
													I certify that the information displayed is correct
												</label>
											</div>
	-->
										</div>
										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous"
														class="previous action-button-previous" value="Previous" />
													<input id="review-next-button" type="button" disabled name="next"
														class="next action-button" value="Next Step" />
												</div>
											</div>
										</div>
									</fieldset>

									<!-- fieldsets -->
									<fieldset class="container">
										<div class="row">

											<h2 class="fs-title text-center mb-4">Payment Information</h2>

											<div class="col-md-6">

												<p>Your request for us to fill out Form W-7 with the option
													<?php echo $selectedOption; ?> has been received. Our fees for
													this service are $<?php echo $servicePricing; ?>.
												</p>
												<p>You can pay for your order via paypal or directly with your debit
													or credit card.</p>
												<!-- -->
												<input type="hidden" id="selectedOption" name="selectedOption"
													value="<?php echo $servicePricing; ?>">
												<input type="hidden" id="amount_for_this_order"
													name="amount_for_this_order" value="<?php echo $servicePricing; ?>">
											</div>
											<div class="col-md-6 d-flex flex-column gap-5 justify-content-center">
												<div id="paypal-button-container" class="d-flex flex-column gap-2">
												</div>
												<script
													src="https://www.paypal.com/sdk/js?client-id=ATRi647PNzVcjz6irqu_IWfJLp4dO9hLVnepSnla2p1fSzdFS4ZrT6MiRv7c3_dwanr2uanCVJYu-ZVL&currency=USD&intent=capture"
													data-sdk-integration-source="integrationbuilder"></script>
												<script
													src="<?php echo URL; ?>/services/itin/assets/js/paypal.js"></script>

											</div>
										</div>

										<div>
											<div class="d-flex justify-content-center pt-5">
												<div class="d-md-flex justify-content-center w-100">
													<input type="button" name="previous"
														class="previous action-button-previous" value="Go Back" />
													<!-- <input type="buttonc" name="make_payment" id="make_payment"
														class="next action-button d-none" value="Confirm" /> -->
													<input type="button" id="make_payment" name="make_payment"
														id="make_payment" class="next action-button d-none"
														value="Confirm" />
												</div>
											</div>
										</div>

									</fieldset>

									<!-- fieldsets -->
									<fieldset class="container ">
										<div class="d-flex flex-column gap-3">
											<h2 class="fs-title text-center">Success!</h2>
											<div class="row justify-content-center gap-3">
												<div class="col-7 text-center">
													<h5>You Have Successfully Submitted The Application.</h5>

												</div>
											</div>

											<div>
												<div class="row justify-content-center pt-5">
													<div class="col-12 d-md-flex justify-content-center">
														<!-- <button type="submit"
															class="action-button action-button-previous">Print
															PDF</button> -->
														<!-- <input type="buttonc" name="make_payment" id="make_payment"
														class="next action-button d-none" value="Confirm" /> -->
														<a href="<?php echo URL; ?>/services/itin/"
															class="action-button px-5">OK</a>
													</div>
												</div>
											</div>
									</fieldset>

								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<?php
	// Load Common Scripts
	loadCommonScripts();
	echo '<script src="' . URL . '/config/config.js"></script>';
	echo '<script src="' . URL . '/services/itin/assets/js/utils.js"></script>';
	echo '<script src="' . URL . '/services/itin/assets/js/itin_application.js"></script>';
	echo '<script src="' . URL . '/services/itin/assets/js/itin_application_helper.js"></script>';
	echo '<script src="' . URL . '/services/itin/assets/js/itin_application_validation.js"></script>';
	echo '<script src="' . URL . '/services/itin/assets/js/itin_application_review.js"></script>';
	// jQuery scripts
	echo '<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>';
	echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>';
	echo '<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>';
	echo '<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>'
		?>

</body>

</html>