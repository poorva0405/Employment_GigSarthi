import { exec } from "child_process";

export const executeFeature = (id) => {
  return new Promise((resolve, reject) => {
    exec(`python features/f${id}.py`, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
};