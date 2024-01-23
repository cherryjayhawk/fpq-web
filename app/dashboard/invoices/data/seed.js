import fs from "fs";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { faker } from "@faker-js/faker";
import { priorities, statuses, payment_options } from "./data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tasks = Array.from({ length: 100 }, () => {
  const QB_quantity = faker.number.int({ min: 0, max: 100 });
  const QB_price = 120000;
  const QB_amount = QB_quantity * QB_price;

  const QK_quantity = faker.number.int({ min: 0, max: 100 });
  const QK_price = 70000;
  const QK_amount = QK_quantity * QK_price;

  const GN_amount = faker.number.int({ min: 0, max: 100000000 });;

  const total = QB_amount + QK_amount + GN_amount;

  return {
    id: faker.string.alphanumeric(16),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(statuses).value,
    priority: faker.helpers.arrayElement(priorities).value,
    timestamp: faker.date.recent(),
    payment_option: faker.helpers.arrayElement(payment_options),
    items: {
      QB_quantity,
      QB_price,
      QB_amount,
      QK_quantity,
      QK_price,
      QK_amount,
      GN_amount,
    },
    total,
  };
});

fs.writeFileSync(
  path.join(__dirname, "invoices.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Tasks data generated.");
