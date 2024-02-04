const { CharacterSet } = require("node-thermal-printer");

const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
require("dotenv").config();

fs = require("fs");

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "//localhost/printer",
  characterSet: CharacterSet.PC737_GREEK,
  removeSpecialCharacters: false,
  lineCharacter: "-",
  options: {
    timeout: 5000,
  },
});

const filename = "./number.txt";
const opap = "./opaplogo.png";
const print = async () => {
  var data = fs.readFileSync(filename, "utf8");
  var number = parseInt(data.toString());
  let isConnected = await printer.isPrinterConnected();
  printer.alignCenter();
  await printer.printImage(opap);
  printer.println(process.env.name);
  printer.println(process.env.address);
  printer.println(process.env.number);
  printer.drawLine();
  printer.println("");
  printer.setTextSize(1, 1);
  printer.println("ΚΛΗΡΩΣΗ");
  printer.println("150€");
  printer.println("");
  printer.println("ΤΕΤΑΡΤΗ 31/08/2022");
  printer.println("ΩΡΑ: 21:00");
  printer.setTextNormal();
  printer.println("");
  printer.println("3 νικητές θα κερδίσουν");
  printer.println("από 50€ αντίστοιχα");
  printer.setTextNormal();
  printer.println("");
  printer.drawLine();
  printer.println("");
  printer.setTextSize(2, 2);
  printer.println("ΛΑΧΝΟΣ");
  printer.print("No");
  printer.setTextSize(3, 3);
  printer.println(number.toString());
  printer.setTextNormal();
  printer.println("");
  printer.drawLine();
  printer.println("");
  printer.println("ΔΕΛΤΙΑ ΣΥΝΟΛΙΚΗΣ ΑΞΙΑΣ 50€ = 1 ΣΥΜΜΕΤΟΧΗ");
  printer.println("1 CHECK IN ΣΤΑ VLT'S = 1 ΣΥΜΜΕΤΟΧΗ");
  printer.println("2 ΣΥΜΜΕΤΟΧΕΣ ΜΕΓΙΣΤΟ ΑΝΑ ΗΜΕΡΑ");

  printer.cut();
  printer.alignCenter();
  printer.setCharacterSet(CharacterSet.WPC1253_GREEK);
  printer.setTextSize(1, 1);
  printer.println("ΚΛΗΡΩΣΗ");
  printer.println("150€");
  printer.println("");
  printer.println("ΤΕΤΑΡΤΗ 31/8");
  printer.println("ΩΡΑ: 21:00");
  printer.setTextNormal();
  printer.println("");
  printer.drawLine();
  printer.println("");
  printer.setTextSize(3, 3);
  printer.println(number.toString());
  number++;
  await fs.writeFile(filename, number.toString(), async () => {
    printer.cut();
    await printer.execute();
  });
};

print();
