import { getPayload } from "payload";
import config from "@payload-config";

async function main() {
  const email = process.env.CMS_ADMIN_EMAIL?.trim();
  const password = process.env.CMS_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD before creating a user.");
  }
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
    throw new Error("PAYLOAD_SECRET and DATABASE_URL are required.");
  }

  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    console.log(`Admin user already exists: ${email}`);
    process.exit(0);
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      name: "Your Health Now",
    },
    overrideAccess: true,
  });

  console.log(`Created admin user: ${email}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
