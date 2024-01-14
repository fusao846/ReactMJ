
export const hipi = (pis:number) => {
  let allPi:number[] = [];
  for (let i = 0; i < 36; i++) {
    allPi.push(Math.floor(i/4) + 1);
  }
  const result:number[] = [];
  let total = 36;
  for (let i = 0; i < pis; i++) {
    const r = Math.floor(Math.random() * total);
    result.push(allPi[r]);
    allPi.splice(r, 1);
    total--;
  }
  return result.sort();
};
export const displayPi = (pi:number[]) => {
  return pi.toString();
};
export const hasToitsuOrShuntsu = (pi:number[]) => {
  if (pi[0]===pi[1] && pi[0]===pi[2]) {
    const moto1 = pi[0];
    pi.splice(0,3);
    return {
      result: true,
      resultPi:[moto1,moto1,moto1],
      remainPi:pi,
    };
  }
  let wkPi = pi.concat();
  const moto = wkPi[0];
  wkPi.splice(0,1);
  let pos = 0;
  if ((pos = wkPi.indexOf(moto+1,0))>=0) {
    wkPi.splice(pos, 1);
    if ((pos = wkPi.indexOf(moto+2,0))>=0) {
      wkPi.splice(pos, 1);
      return {
        result:true,
        resultPi:[moto, moto+1, moto+2],
        remainPi:wkPi,
      };
    } else {
      return {
        result:false,
      };
    }
  } 
  return {
    result:false
  };
};
export const recurHasToitsuOrShuntsu = (pi:number[], agari:number[]) => {
  if (pi.length === 0) {
    return {
      result:true,
      agariPi: agari,
    }
  }
  const result = hasToitsuOrShuntsu(pi);
  if (result.result === true) {
    const res:any = recurHasToitsuOrShuntsu(result.remainPi!, agari.concat(result.resultPi!));
    if (res.result === true) {
      return {
        result:true,
        agariPi: res.agariPi,
      };
    }
  } 
  return {
    result:false,
  };
};
export const agari = (pi:number[]) => {
  let agariKei:(number[])[] = [];
  for (let i = 1; i <= 9; i++) {
    let head:number[] = [];
    let wkPi = pi.concat();
    if (wkPi.filter(n => n===i).length < 4) {
      wkPi.push(i);
      wkPi.sort();
      if (sevenToitsu(wkPi)) {
        let ak7 = [i];
        ak7 = ak7.concat(wkPi);
        ak7.push(777);
        agariKei.push(ak7);
       // break;
      } else {
        for (let h = 1; h <= 9; h++) {
          const wkPi2 = wkPi.concat();
          if (wkPi2.filter(n => n===h).length >= 2) {
            const pos = wkPi2.indexOf(h);
            head = [h,h];
            wkPi2.splice(pos, 2);
            const agResult = recurHasToitsuOrShuntsu(wkPi2, []);
            if (agResult!.result === true) {
              let ak = [i];
              ak = ak.concat(head);
              ak = ak.concat(agResult?.agariPi);
              agariKei.push(ak);
              break;
            }
          }
        }  
      }
    }
  }
  return agariKei;
};

const sevenToitsu = (pi:number[]) => {
  let wkPi = pi.concat();
  let wk = 0;
  while (wkPi.length > 0) {
    if (wkPi[0] === wkPi[1] && wkPi[0] !== wk) {
      wk = wkPi[0];
      wkPi.splice(0, 2);
    } else {
      return false;
    }
  }
  return true;
};
export const seepi = (level:string) => {
  let hp:number[] = [];
  let agariKei:(number[])[] = [];
  while (true) {
    hp = hipi(13);
    //hp = [1,2,2,3,3,4,4,5,5,6,6,7,7];
    agariKei = agari(hp);
    if (level === 'mix' && agariKei.length > 0) {
      break;
    }
    if (level === 'easy' && agariKei.length !== 0 && agariKei.length <= 3) {
      break;
    }
    if (level === 'high' && agariKei.length !== 0 && agariKei.length > 3) {
      break;
    }
  }
  return {
    hipi:hp,
    agari:agariKei,
  }
};