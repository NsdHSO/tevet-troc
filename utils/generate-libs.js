const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('📦 Enter library name (e.g. emergency): ', (libName) => {
  const cmd = `npx nest g library buss/${libName}`;
  console.log(`\n🚀 Running: ${cmd}\n`);
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error: ${stderr}`);
    } else {
      console.log(stdout);
    }
    rl.close();
  });
});
