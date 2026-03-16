import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { sendContactMessage } from '../services/contactService'

function Contact() {
  const [isSending, setIsSending] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (formValues) => {
    setIsSending(true)

    try {
      const payload = {
        name: formValues.name,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message,
      }

      await sendContactMessage(payload)

      await Swal.fire({
        icon: 'success',
        title: 'COMUNICACIÓN_ESTABLECIDA',
        text: `Gracias ${formValues.name}, mensaje recibido.`,
        confirmButtonColor: '#22d3ee',
        background: '#020617',
        color: '#f8fafc',
      })

      reset()
    } catch (error) {
      const backendMessage = error?.response?.data?.message

      await Swal.fire({
        icon: 'error',
        title: 'FALLO_DE_CONEXIÓN',
        text: backendMessage || 'No se pudo enviar el mensaje al servidor Spring Boot.',
        confirmButtonColor: '#22d3ee',
        background: '#020617',
        color: '#f8fafc',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      <div className="layout-container relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16 border-l-2 border-cyan-500 pl-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-600 dark:text-cyan-400 font-mono mb-2">Canal_Contacto</p>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter sm:text-5xl lg:text-6xl">
            Contacto <span className="text-cyan-500">Directo</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl font-mono text-sm">
            Canal abierto para consultas académicas, prácticas o colaboraciones.
            Responderé desde mi correo personal.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glass-card p-6 sm:p-8 border border-white/5 relative overflow-hidden"
          >
             {/* Decorative HUD Elements */}
            <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-cyan-500/20">RESPUESTA: ACADÉMICA</div>
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-cyan-500 shadow-[0_0_10px_#22d3ee]" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Identidad Usuario
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="w-full glass-card bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-white/10 px-4 py-3 text-slate-800 dark:text-white outline-none transition focus:border-cyan-500/50"
                    placeholder="Ingresa tu nombre..."
                    {...register('name', { 
                      required: 'Nombre requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                    })}
                  />
                  {errors.name && <p className="mt-2 text-[10px] font-mono text-rose-500">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full glass-card bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-white/10 px-4 py-3 text-slate-800 dark:text-white outline-none transition focus:border-cyan-500/50"
                    placeholder="usuario@correo.com"
                    {...register('email', {
                      required: 'Correo requerido',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Formato de correo inválido',
                      },
                      maxLength: { value: 150, message: 'Máximo 150 caracteres' }
                    })}
                  />
                  {errors.email && <p className="mt-2 text-[10px] font-mono text-rose-500">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Asunto
                </label>
                <input
                  id="subject"
                  type="text"
                  autoComplete="off"
                  className="w-full glass-card bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-white/10 px-4 py-3 text-slate-800 dark:text-white outline-none transition focus:border-cyan-500/50"
                  placeholder="Asunto del mensaje..."
                  {...register('subject', { 
                    required: 'Asunto requerido',
                    minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                    maxLength: { value: 150, message: 'Máximo 150 caracteres' }
                  })}
                />
                {errors.subject && <p className="mt-2 text-[10px] font-mono text-rose-500">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  autoComplete="off"
                  className="w-full glass-card bg-slate-100 dark:bg-slate-950/50 border-slate-300 dark:border-white/10 px-4 py-3 text-slate-800 dark:text-white outline-none transition focus:border-cyan-500/50"
                  placeholder="Escribe tu mensaje detallado..."
                  {...register('message', {
                    required: 'Mensaje requerido',
                    minLength: {
                      value: 10,
                      message: 'Mínimo 10 caracteres',
                    },
                    maxLength: {
                      value: 2000,
                      message: 'Máximo 2000 caracteres',
                    },
                  })}
                />
                {errors.message && <p className="mt-2 text-[10px] font-mono text-rose-500">{errors.message.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34,211,238,0.4)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-cyan-500 text-slate-950 font-black uppercase tracking-[0.2em] rounded-lg transition-all disabled:opacity-50"
              >
                {isSending ? 'ESTABLECIENDO_ENLACE...' : 'ENVIAR_MENSAJE'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
