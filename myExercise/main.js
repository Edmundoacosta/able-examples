let departments = [];
let provinces = [];
let districts = [];

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      resolve(text);
    };
    reader.readAsText(input.files[0]);
};

function resolve(text) {
	let data = text.split(/\r\n|\n/);
	for (var i = 0; i < data.length; i++) {
		let info = data[i].split('"')[1];
		let parts = info.split("/");
		let department = getObject(parts[0]);
		department.parent['code'] = '-';
		department.parent['name'] = '-';
		let validateDepartment = departments.find(dep => dep.code == department.code);
		if (!validateDepartment) {
			departments.push(department)
		}
		let province = getObject(parts[1]);
		if (province) {
			province.parent = department;
			let validateProvince = provinces.find(prov => prov.code == province.code);
			if (!validateProvince) {
				provinces.push(province);
			}
			let district = getObject(parts[2]);
			if (district) {
				district.parent = province;
				let validateDistrict = districts.find(dis => dis.code == district.code);
				if (!validateDistrict) {
					districts.push(district);
				}
			}
		}
	}
	console.log(departments);
	showData('Departamentos', departments);
	showData('Provincias', provinces);
	showData('Distritos', districts);
}

function getObject(data){
	if (data.trim() == '') return null
	data = data.trim().split(' ');
	return {
		code: data[0],
		name: data[1],
		parent: {}
	}
}

function showData(title, list){
	let html = '<h3>' + title + '</h3>';
	html += '<table class="table">';
	html += '<thead>';
	html += '<tr>';
	html += '<th>Código</th>';
	html += '<th>Nombre</th>';
	html += '<th>Código Padre</th>';
	html += '<th>Descripción Padre</th>';
	html += '</tr>';
	html += '</thead>';

	html += '<tbody>';
	

	for(let row of list){
		html += '<tr>';	
		html += '<td>' + row.code + '</td>';
		html += '<td>' + row.name + '</td>';
		html += '<td>' + row.parent.code + '</td>';
		html += '<td>' + row.parent.name + '</td>';
		html += '</tr>';	
	}

	
	html += '</tbody>';

	html += '</table>'


	$('.result-content').append(html);
}