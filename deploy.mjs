import * as ftp from "basic-ftp";

process.loadEnvFile(".env.deploy");

const LOCAL_DIR = "dist/embedded-portfolio/browser";   // adjust to your project
const REMOTE_DIR = "dalilawini-portfolio.rf.gd/htdocs";

const client = new ftp.Client();
client.ftp.verbose = true;

try {
  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    // FTPS by default; set FTP_SECURE=false in .env.deploy only if the host lacks TLS
    secure: process.env.FTP_SECURE !== "false",
    secureOptions: { rejectUnauthorized: process.env.FTP_REJECT_UNAUTHORIZED !== "false" },
  });
  await client.ensureDir(REMOTE_DIR);
  await client.clearWorkingDir();
  await client.uploadFromDir(LOCAL_DIR);
  console.log("Deployed!");
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  client.close();
}