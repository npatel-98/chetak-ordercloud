import { ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
import login from '../../redux/ocAuth/login'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'

interface OcLoginFormProps {
  title?: string
  onLoggedIn: () => void
}

const OcLoginForm: FunctionComponent<OcLoginFormProps> = ({
  title = 'Sign into your account',
  onLoggedIn,
}) => {
  const dispatch = useOcDispatch()

  const { loading, error, isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
    error: s.ocAuth.error,
    loading: s.ocAuth.loading,
  }))

  const [formValues, setFormValues] = useState({
    identifier: '',
    password: '',
    remember: false,
  })

  const handleInputChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: e.target.value }))
  }

  const handleCheckboxChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: !!e.target.checked }))
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch(
        login({
          username: formValues.identifier,
          password: formValues.password,
          remember: formValues.remember,
        })
      )
    },
    [formValues, dispatch]
  )

  useEffect(() => {
    if (!isAnonymous) {
      onLoggedIn()
    }
  }, [isAnonymous, onLoggedIn])

  return (
    <form
      name="ocLoginForm"
      onSubmit={handleSubmit}
      className="absolute md:container md:mx-auto bg-orange-100 rounded-lg flex flex-col px-4 md:items-center md:w-fit md:px-4 md:py-8 min-w-[400px] bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto relative opacity-90"
    >
      <h1 className="pb-4">{title}</h1>
      {error && <p>{error.message}</p>}

      <label htmlFor="identifier" className="pb-6  min-w-[80%] text-gray-600">
        Username
        <input
          type="text"
          id="identifier"
          name="identifier"
          placeholder="Enter username"
          value={formValues.identifier}
          onChange={handleInputChange('identifier')}
          required
          className="p-2 w-full text-gray-600"
        />
      </label>

      <label htmlFor="password" className="pb-6 min-w-[80%] text-gray-600">
        Password
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={formValues.password}
          onChange={handleInputChange('password')}
          required
          className="p-2 w-full text-gray-600"
        />
      </label>

      <label htmlFor="remember" className="pb-6">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={formValues.remember}
          onChange={handleCheckboxChange('remember')}
          className="mr-3"
        />
        Keep me logged in
      </label>

      <button
        disabled={loading}
        type="submit"
        className="p-2 rounded-lg px-5 py-2 hover:cursor-pointer hover:text-neutral-200 
      bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 
      "
      >
        Submit
      </button>
    </form>
  )
}

export default OcLoginForm
