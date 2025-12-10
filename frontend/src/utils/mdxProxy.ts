export const mdxProxy = (url: string) => {
  const backend = import.meta.env.VITE_PROXY_URL;
  return `${backend}/proxy?url=${encodeURIComponent(url)}`;
};
