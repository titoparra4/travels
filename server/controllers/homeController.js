const Viaje = require('../model/viajes');
const Testimonial = require('../model/Testimoniales');

exports.consultasHomepage = async (req, res) => {
	const promises = [];

	const viajes = await Viaje.findAll({
		limit: 3
	});

	const testimoniales = await Testimonial.findAll({
		limit: 3
	});

	res.render('index', {
		pagina: 'Proximos Viajes',
		clase: 'home',
		viajes,
		testimoniales
	});
};
