type Callback<A, B> = (...paramS: A[]) => Promise<B>;

/**
 * Awaits a given timeout
 */
export const sleep = (wait: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, wait);
  });

/**
 * Non-flicker data loader (function wrapper), prevents UI flashes when data loads too fast
 */
export const withoutFlickering =
  <A, B>(callback: Callback<A, B>, minimunWait = 1200, enabled = true) =>
  async (...args: A[]) => {
    const time = Date.now();
    const result = await callback(...args);
    if (!enabled) {
      return result;
    }
    if (time + minimunWait - Date.now() <= 0) {
      return result;
    }
    await sleep(time + minimunWait - Date.now());
    return result;
  };
