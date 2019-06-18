import moment from "moment";
import { t } from "./i18n";
const exp_empty = /[0-9a-zA-Z]+/;
const exp_mobile = /^[1-9]{1}\d{9}$/;
const exp_numbers = /^[-0-9]*$/;
const exp_letter = /^[a-zA-Z]*$/;
const exp_letter_with_space = /^[a-zA-Z\s]*$/;
const exp_lettersOrNumbers = /^[a-zA-Z0-9]*$/;
const exp_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const exp_pincode = /^\d{6}$/;
const exp_pan = /^[0-9a-zA-Z]{3}[pP][0-9a-zA-Z]{6}$/;
const exp_landline = /^[1-9]{1}[0-9]{7}$/;
const exp_ifsc = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
const exp_address_special_chars = /^[A-Za-z0-9 \-.,#/]*$/;

const restrictedEmails = [
  "yahoo.co.in",
  "yahoo.in",
  "ymail.com",
  "live.com",
  "icloud.com",
  "rocketmail.com",
  "india.com",
  "vsnl.com",
  "vsnl.net",
  "live.in",
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "rediffmail.com"
];

export function isRequired(value) {
  return isValid(exp_empty, value, t("validation.required"));
}

export function isAptSalary(value) {
  return (
    isRequired(value) || isNumbers(value) || numberGreaterThan(value, 24999)
  );
}

export function isTrue(value) {
  return value ? null : "Must be true";
}

export function isLetters(value) {
  return isValid(exp_letter, value, "Invalid Characters");
}

export function isAddress(value) {
  return !value
    ? null
    : lengthBetween(value, 3, 40) ||
        isValid(
          exp_address_special_chars,
          value,
          "Allowed only - . , # / spcl. chars"
        );
}

export function isAddressAndRequired(value) {
  return isRequired(value) || isAddress(value);
}

export function isLettersWithSpaces(value) {
  return isValid(exp_letter_with_space, value, "Invalid Characters");
}

export function isIfsc(value) {
  return isValid(exp_ifsc, value, "Invalid IFSC Code");
}

export function isNumbers(value) {
  return isValid(exp_numbers, value, "Invalid Numbers");
}

export function isNumbersOrLetters(value) {
  return isValid(
    exp_lettersOrNumbers,
    value,
    "No spaces or special character allowed."
  );
}

export function isNumbersOrLettersAndRequired(value) {
  return isRequired(value) || isNumbersOrLetters(value);
}

export function isEmail(value) {
  return isRequired(value) || isValid(exp_email, value, t("validation.email"));
}

export function isOfficialEmail(value = "") {
  return value
    ? isValid(exp_email, value, t("validation.email")) ||
        (restrictedEmails.indexOf(value.split("@")[1]) === -1
          ? null
          : "Enter Official Email")
    : null;
}

export function isPanNumber(value) {
  return isRequired(value) || isValid(exp_pan, value, "Invalid Pan Number");
}

export function isMobileOptional(value) {
  return !value ? null : isValid(exp_mobile, value, "Invalid Mobile No.");
}

export function isMobile(value) {
  return isRequired(value) || isValid(exp_mobile, value, "Invalid Mobile No.");
}

export function isLandline(value) {
  return !value ? null : isValid(exp_landline, value, "Invalid Landline No.");
}

export function isDate(value) {
  return (
    isRequired(value) ||
    isValid(exp_numbers, value, "Invalid Date") ||
    parseDate(value)
  );
}

export function isNotFutureDate(value) {
  return isDate(value) || pastDate(value);
}

export function isLettersAndRequired(value) {
  return isRequired(value) || isLetters(value);
}

export function isLettersWithSpacesAndRequired(value) {
  return isRequired(value) || isLettersWithSpaces(value);
}

export function isPincode(value) {
  return (
    isRequired(value) ||
    isNumbers(value) ||
    isValid(exp_pincode, value, "Invalid Pincode")
  );
}

export function isNumbersAndRequired(value) {
  return isRequired(value) || isNumbers(value);
}

export function isBankAccountNumber(value) {
  return isNumbersAndRequired(value) || lengthBetween(value, 5, 22);
}

export function isBankAccountName(value) {
  return isRequired(value) || lengthBetween(value, 4, 120);
}

export function isAptAge(value) {
  return isDate(value) || ageBetween(value, 23, 60);
}

export function isAptNumber(value) {
  return isNumbers(value) || numberBetween(value, 0, 100);
}

export function isAptWorkEx(value) {
  return isNumbers(value) || numberBetween(value, 0, 100);
}

function isValid(pattern, value = "", message) {
  return pattern.test(value) ? null : message;
}

function parseDate(value) {
  return moment(value).isValid() ? null : "Invalid Date";
}

function pastDate(value) {
  return moment(value).isBefore(moment()) ? null : "Future Date Not Allowed";
}

function numberBetween(value, min, max) {
  return !value || (min <= value && value <= max)
    ? null
    : "Should be between " + min + " & " + max;
}

function numberGreaterThan(value, limit) {
  return !value || value > limit ? null : "Should be greater than " + limit;
}

function lengthBetween(value, min, max) {
  return !value || (min <= ("" + value).length && ("" + value).length <= max)
    ? null
    : "Length should be between " + min + " & " + max;
}

function ageBetween(value, min, max) {
  const age = moment().diff(moment(value), "years");
  return min <= age && age <= max
    ? null
    : "Age should be between " + min + " & " + max;
}
