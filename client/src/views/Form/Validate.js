export const validateInput = (input) => {
    let errors = {};
  
    if (!input.name.trim()) {
      errors.name = "Name is required";
    }
  
    if (!input.image.trim()) {
      errors.image = "Image URL is required";
    }
  
    if (!input.weight_min) {
      errors.weight_min = "Minimum weight is required";
    }
  
    if (!input.weight_max) {
      errors.weight_max = "Maximum weight is required";
    }
  
    if (input.weight_min && input.weight_max && input.weight_min > input.weight_max) {
      errors.weight_min = "Minimum weight must be less than or equal to maximum weight";
    }
  
    if (!input.height_min) {
      errors.height_min = "Minimum height is required";
    }
  
    if (!input.height_max) {
      errors.height_max = "Maximum height is required";
    }
  
    if (input.height_min && input.height_max && input.height_min > input.height_max) {
      errors.height_min = "Minimum height must be less than or equal to maximum height";
    }
  
    if (!input.life_span_min) {
      errors.life_span_min = "Minimum life span is required";
    }
  
    if (!input.life_span_max) {
      errors.life_span_max = "Maximum life span is required";
    }
  
    if (input.life_span_min && input.life_span_max && input.life_span_min > input.life_span_max) {
      errors.life_span_min = "Minimum life span must be less than or equal to maximum life span";
    }
  
    if (input.temperament.length === 0) {
      errors.temperament = "At least one temperament is required";
    }
  
    return errors;
  };