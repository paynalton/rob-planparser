# rob-planparser
Este repositorio lee un archivo o una cadena de texto que contenga un documento del tipo Nutrimental Plan Document y lo devuelve un objeto JSON.



## Install



`npm -i rob-planparser`



## Usage



`const  parser  = require('rob-planparser')

parser.parseFromString(resp.xmlString).then(
	(data)=>{
		console.log(data);
		},error=>console.error(error)
	).catch(error=>console.log(error));`