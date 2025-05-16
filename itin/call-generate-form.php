<?php
require __DIR__ . '/../../config/config.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Call generate form</title>
</head>

<body>
    <form method="post" action="<?php echo URL ?>/services/itin/generate-form.php">
        <label for="email">Email</label>
        <input type="text" name="email" id="email">

        <input type="submit" value="Generate W-7 Form">
    </form>
</body>

</html>