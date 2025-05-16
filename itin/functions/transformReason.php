<?php
function transformReason(string $reason): string
{
    switch ($reason) {
        case "a":
            return "A. Nonresident Alien Required To Get An ITIN To Claim Tax Treaty Benefit";
        case "b":
            return "B. Nonresident Alien Filing A U.S. Federal Tax Return";
        case "c":
            return "C. U.S. Resident Alien (Based On Days Present In The United States) Filing A U.S Federal Tax Return";
        case "d":
            return "D. Dependent Of U.S. Citizen/Resident Alien";
        case "e":
            return "E. Spouse Of U.S. Citizen/Resident Alien";
        case "f":
            return "F. Nonresident Alien Student, Professor, Or Researcher Filing A U.S Federal Tax Return Or Claiming An Exception";
        case "g":
            return "G. Dependent/Spouse Of A Nonresident Alien Holding A U.S. Visa";
        default:
            return "H. Other";
    }
}
?>