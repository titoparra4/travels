const Viaje = require('../model/viajes');

exports.mostrarViajes = async (req, res) => {
	const viajes = await Viaje.findAll();

	res.render('viajes', {
		pagina: 'Next Trips',
		viajes
	});
};

exports.mostrarViaje = async (req, res) => {
	const viaje = await Viaje.findByPk(req.params.id);
	res.render('viaje', {
		viaje
	});
};
