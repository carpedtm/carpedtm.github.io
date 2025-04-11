export const measurePerformance = (name: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
  } else {
    fn();
  }
};

export const logPerformance = (name: string, duration: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`⏱️ ${name} took ${duration.toFixed(2)}ms`);
  }
}; 