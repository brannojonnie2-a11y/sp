// Get accurate geolocation data from ip-api.com
export async function getGeolocation(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,countryCode,status`)

    if (!response.ok) {
      return { country: "Unknown", city: "Unknown", countryCode: "" }
    }

    const data = await response.json()

    if (data.status !== "success") {
      return { country: "Unknown", city: "Unknown", countryCode: "" }
    }

    return {
      country: data.country || "Unknown",
      city: data.city || "Unknown",
      countryCode: data.countryCode || "",
    }
  } catch (error) {
    console.error("[v0] Error fetching geolocation:", error)
    return { country: "Unknown", city: "Unknown", countryCode: "" }
  }
}
