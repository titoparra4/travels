const Testimonial = require('../model/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
	const testimoniales = await Testimonial.findAll();
	res.render('testimoniales', {
		pagina: 'Testimoniales',
		testimoniales
	});
};

exports.agregarTestimonial = async (req, res) => {
	let { nombre, correo, mensaje } = req.body;

	let errores = [];
	if (!nombre) {
		errores.push({ mensaje: 'Write your name' });
	}
	if (!correo) {
		errores.push({ mensaje: 'Write your email' });
	}
	if (!mensaje) {
		errores.push({ mensaje: 'Write your message' });
	}

	if (errores.length > 0) {
		const testimoniales = await Testimonial.findAll();
		res.render('testimoniales', {
			errores,
			nombre,
			correo,
			mensaje,
			pagina: 'Testtimoniales',
			testimoniales
		});
	} else {
		Testimonial.create({
			nombre,
			correo,
			mensaje
		})
			.then((testimonial) => res.redirect('/testimoniales'))
			.catch((error) => console.log(error));
	}
};
