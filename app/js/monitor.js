const path = require("path");
const osu = require("node-os-utils");
const mem = osu.mem;
const cpu = osu.cpu;
const os = osu.os;

//variables

const cpu_overload = 20;
const alertFrequency = 1; //minutes

function getAndSetupCpuUsage() {
  cpu.usage().then((i) => {
    document.getElementById("cpu-usage").innerText = Number(i).toFixed(2) + "%";
    document.getElementById("cpu-progress").style.width =
      Number(i).toFixed(2) + "%";

    //change progress color to red of crossing cpu_overload
    if (i > cpu_overload) {
      document.getElementById("cpu-progress").style.background = "red";
    } else {
      document.getElementById("cpu-progress").style.background = "#30c88b";
    }
    //check overload

    if (i >= cpu_overload && runNotify(alertFrequency)) {
      notifyUser({
        title: "CPU Overload",
        body: `CPU is over ${cpu_overload}%`,
        icon: path.join(__dirname, "img", "icon.png"),
      });
      localStorage.setItem("lastNotifyTime", new Date().getTime());
    }
  });

  cpu.free().then((i) => {
    document.getElementById("cpu-free").innerText = Number(i).toFixed(2) + "%";
  });

  //uptime in  DD HH:MM:SS
  document.getElementById("sys-uptime").innerText = secondsToDHMS(os.uptime());
}
getAndSetupCpuUsage();
// run every 2s
setInterval(() => {
  //CPU Usage
  getAndSetupCpuUsage();
}, 2000);

// render cpu model

document.getElementById("cpu-model").innerText = cpu.model();

//Computer name
document.getElementById("comp-name").innerText = os.hostname();

// OS
document.getElementById("os").innerText = `${os.type()} ${os.arch()}`;

//Memory

mem.info().then((info) => {
  document.getElementById("mem-total").innerText = info.totalMemMb;
});

// show DD HH MM SS

function secondsToDHMS(sec) {
  sec = Number(sec);
  const d = Math.floor(sec / (3600 * 24));
  const h = Math.floor((sec % (3600 * 24)) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${d}d, ${h}h:${m}m:${s}s`;
}

//send notification

function notifyUser(options) {
  new Notification(options.title, options);
}

//check when last notif has been sent
function runNotify(frequency) {
  if (localStorage.getItem("lastNotifyTime") === null) {
    console.log("no prev saved time");

    //store timestamp
    localStorage.setItem("lastNotifyTime", new Date().getTime());
    return true;
  }

  const notifyTime = Math.floor(
    Number(localStorage.getItem("lastNotifyTime")) / 1000
  );
  const now = Math.floor(new Date().getTime() / 1000);
  const diff = now - notifyTime;
  console.log({ notifyTime, now, diff });

  const minutesPassed = Math.ceil(diff / 60);
  console.log({ minutesPassed, frequency });

  if (minutesPassed > frequency) {
    return true;
  }
  return false;
}
