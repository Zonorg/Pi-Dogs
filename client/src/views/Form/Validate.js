export const validateInput = (input) => {
  let errors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required";
  }

  if (!input.image.trim()) {
    errors.image = "Image URL is required";
  }

  if (input.weight_min < 0) {
    errors.weight_min = "Minimum weight cannot be negative";
  }

  if (input.weight_max < 0) {
    errors.weight_max = "Maximum weight cannot be negative";
  }

  if (input.weight_min >= input.weight_max) {
    errors.weight_min =
      "Minimum weight must be less than maximum weight";
  }

  if (input.height_min < 0) {
    errors.height_min = "Minimum height cannot be negative";
  }

  if (input.height_max < 0) {
    errors.height_max = "Maximum height cannot be negative";
  }

  if (input.height_min >= input.height_max) {
    errors.height_min =
      "Minimum height must be less than maximum height";
  }

  if (input.life_span_min < 0) {
    errors.life_span_min = "Minimum life span cannot be negative";
  }

  if (input.life_span_max < 0) {
    errors.life_span_max = "Maximum life span cannot be negative";
  }

  if (input.life_span_min >= input.life_span_max) {
    errors.life_span_min =
      "Minimum life span must be less than maximum life span";
  }

  if (input.temperament.length === 0) {
    errors.temperament = "At least one temperament is required";
  }

  return errors;
};
