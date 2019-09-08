
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

let parseMenu=data=>{
    menu={
        document:{
            pageSize:data["plan-alimenticio"].ATTR.pageSize?data["plan-alimenticio"].ATTR.pageSize:'letter',
            title:data["plan-alimenticio"].ATTR.title?data["plan-alimenticio"].ATTR.title:'',
            author:data["plan-alimenticio"].ATTR.author?data["plan-alimenticio"].ATTR.author:'',
            keywords:data["plan-alimenticio"].ATTR.keywords?data["plan-alimenticio"].ATTR.keywords:'',
            creator:data["plan-alimenticio"].ATTR.creator?data["plan-alimenticio"].ATTR.creator:'',
            subject:data["plan-alimenticio"].ATTR.subject?data["plan-alimenticio"].ATTR.subject:'',
            id:data["plan-alimenticio"].ATTR.id?data["plan-alimenticio"].ATTR.id:'',
            producer:data["plan-alimenticio"].ATTR.producer?data["plan-alimenticio"].ATTR.producer:'RoBalance Menu Generator',
        },
        paciente:{
            nombre: data["plan-alimenticio"].paciente[0].ATTR.nombre
        },
        recetas:{},
        semana:{
            lunes:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            },
            martes:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            },
            miercoles:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            },
            jueves:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            },
            viernes:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            },
            sabado:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            },
            domingo:{
                infusion:[],
                desayuno:[],
                colacion1:[],
                comida:[],
                colacion2:[],
                cena:[]
            }
        }
    };
    for(let i in data['plan-alimenticio'].recetas[0].receta){
        let receta={
            title:data['plan-alimenticio'].recetas[0].receta[i].ATTR.title,
            position:parseInt(data['plan-alimenticio'].recetas[0].receta[i].ATTR.position),
            ingredientes:[],
            preparacion:[],
            resumen:data['plan-alimenticio'].recetas[0].receta[i].ATTR.resumen,
            subtitle:data['plan-alimenticio'].recetas[0].receta[i].ATTR.subtitle
        };
        for(let j in data['plan-alimenticio'].recetas[0].receta[i].ingrediente){
            receta.ingredientes.push(data['plan-alimenticio'].recetas[0].receta[i].ingrediente[j]);
        }
        for(let j in data['plan-alimenticio'].recetas[0].receta[i].preparacion){
            receta.preparacion.push(data['plan-alimenticio'].recetas[0].receta[i].preparacion[j]);
        }
        menu.recetas[data['plan-alimenticio'].recetas[0].receta[i].ATTR.id]=receta;
    }
    for(let i in data['plan-alimenticio'].semana[0].dia){
        for(let j in data['plan-alimenticio'].semana[0].dia[i].infusion[0].item){
            menu.semana[data['plan-alimenticio'].semana[0].dia[i].ATTR.id].infusion.push(data['plan-alimenticio'].semana[0].dia[i].infusion[0].item[j].ATTR.receta);
        }
        for(let j in data['plan-alimenticio'].semana[0].dia[i].desayuno[0].item){
            menu.semana[data['plan-alimenticio'].semana[0].dia[i].ATTR.id].desayuno.push(data['plan-alimenticio'].semana[0].dia[i].desayuno[0].item[j].ATTR.receta);
        }
        for(let j in data['plan-alimenticio'].semana[0].dia[i].colacion1[0].item){
            menu.semana[data['plan-alimenticio'].semana[0].dia[i].ATTR.id].colacion1.push(data['plan-alimenticio'].semana[0].dia[i].colacion1[0].item[j].ATTR.receta);
        }
        for(let j in data['plan-alimenticio'].semana[0].dia[i].comida[0].item){
            menu.semana[data['plan-alimenticio'].semana[0].dia[i].ATTR.id].comida.push(data['plan-alimenticio'].semana[0].dia[i].comida[0].item[j].ATTR.receta);
        }
        for(let j in data['plan-alimenticio'].semana[0].dia[i].colacion2[0].item){
            menu.semana[data['plan-alimenticio'].semana[0].dia[i].ATTR.id].colacion2.push(data['plan-alimenticio'].semana[0].dia[i].colacion2[0].item[j].ATTR.receta);
        }
        for(let j in data['plan-alimenticio'].semana[0].dia[i].cena[0].item){
            menu.semana[data['plan-alimenticio'].semana[0].dia[i].ATTR.id].cena.push(data['plan-alimenticio'].semana[0].dia[i].cena[0].item[j].ATTR.receta);
        }
    }
    return menu;
}

module.exports = {
    parseFromFile: (path)=>{
        return new Promise((resolve,reject)=>{
            try{
                let xml_string = fs.readFileSync(path, "utf8");
                parser.parseString(xml_string,(error, result)=>{
                    if(error === null) {
                        let menu = parseMenu(result);

                        resolve(menu);
                    }
                    else {
                        reject("No fue posible cargar el archivo XML");
                    }
                });
            }catch(e){
                reject(e);
            }
        });
    },
    parseFromString: (xml_string)=>{
        return new Promise((resolve,reject)=>{
            try{
                parser.parseString(xml_string,(error, result)=>{
                    if(error === null) {
                        let menu = parseMenu(result);

                        resolve(menu);
                    }
                    else {
                        reject("No fue posible cargar el string XML");
                    }
                });
            }catch(e){
                reject(e);
            }
        });
    }
}