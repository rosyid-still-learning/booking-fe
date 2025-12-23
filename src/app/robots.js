export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/user"],
    },
    sitemap: "https://ganesha-booking.rosyidcloud.my.id/sitemap.xml",
  };
}
