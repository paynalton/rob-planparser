# rob-planparser
Este repositorio lee un archivo o una cadena de texto que contenga un documento del tipo Nutrimental Plan Document y lo devuelve un objeto JSON.



## Install



`npm -i rob-planparser`



## Usage



`const  parser  = require('rob-planparser')`



`parser.parseFromString(resp.xmlString).then(`

​                                    `(xmlData)=>{`

​                                        `menuCreator.parse(xmlData,output/${resp.filename});`

​                                    `},error=>console.error(error)`

​                            `).catch(error=>console.log(error))`