export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    if ('errors' in error && Array.isArray(error.errors) && error.errors.length > 0) {
      return error.errors[0];
    }
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
  }
  return "An unexpected error occurred";
};