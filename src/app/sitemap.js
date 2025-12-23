export default function sitemap() {
  const baseUrl = "https://ganesha-booking.rosyidcloud.my.id";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
