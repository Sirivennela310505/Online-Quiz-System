import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

const practiceTopics = [
  {
    id: 'java',
    title: 'Java',
    level: 'Beginner to intermediate',
    minutes: 12,
    description: 'OOP, collections, exceptions, and core syntax.',
    questions: [
      {
        text: 'Which Java concept allows one class to reuse fields and methods from another class?',
        options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
        answer: 1,
      },
      {
        text: 'Which collection does not allow duplicate elements?',
        options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
        answer: 2,
      },
      {
        text: 'What is the purpose of the finally block?',
        options: ['Run only when an exception happens', 'Run after try/catch whether an exception occurs or not', 'Declare a custom exception', 'Stop program execution'],
        answer: 1,
      },
      {
        text: 'Which keyword prevents a class from being inherited?',
        options: ['static', 'private', 'final', 'sealed'],
        answer: 2,
      },
      {
        text: 'Which method is the entry point of a standard Java application?',
        options: ['start()', 'run()', 'main()', 'init()'],
        answer: 2,
      },
      {
        text: 'Which access modifier allows visibility only inside the same class?',
        options: ['public', 'protected', 'private', 'default'],
        answer: 2,
      },
      {
        text: 'Which interface is commonly used to sort objects naturally?',
        options: ['Runnable', 'Comparable', 'Serializable', 'Cloneable'],
        answer: 1,
      },
      {
        text: 'What does JVM stand for?',
        options: ['Java Virtual Machine', 'Java Verified Module', 'Joint Variable Method', 'Java Visual Manager'],
        answer: 0,
      },
      {
        text: 'Which keyword is used to create an object?',
        options: ['class', 'this', 'new', 'object'],
        answer: 2,
      },
      {
        text: 'Which exception type is checked at compile time?',
        options: ['NullPointerException', 'IOException', 'ArithmeticException', 'ArrayIndexOutOfBoundsException'],
        answer: 1,
      },
    ],
  },
  {
    id: 'dbms',
    title: 'DBMS',
    level: 'Core database skills',
    minutes: 10,
    description: 'SQL, keys, normalization, and transactions.',
    questions: [
      {
        text: 'Which SQL command is used to fetch records from a table?',
        options: ['SELECT', 'FETCH', 'READ', 'OPEN'],
        answer: 0,
      },
      {
        text: 'A primary key must be:',
        options: ['Nullable and repeated', 'Unique and not null', 'Only text', 'Always auto-incremented'],
        answer: 1,
      },
      {
        text: 'Which normal form removes partial dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        answer: 1,
      },
      {
        text: 'ACID property that guarantees all operations complete or none do is:',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        answer: 0,
      },
      {
        text: 'Which join returns matching rows from both tables?',
        options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN'],
        answer: 2,
      },
      {
        text: 'Which SQL clause filters grouped records?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
        answer: 1,
      },
      {
        text: 'A foreign key is used to:',
        options: ['Encrypt a password', 'Link records between tables', 'Remove duplicate rows', 'Sort records'],
        answer: 1,
      },
      {
        text: 'Which command permanently removes a table structure and data?',
        options: ['DELETE', 'DROP', 'TRUNCATE', 'REMOVE'],
        answer: 1,
      },
      {
        text: 'Which isolation issue happens when a transaction reads uncommitted data?',
        options: ['Dirty read', 'Deadlock', 'Lost update', 'Index scan'],
        answer: 0,
      },
      {
        text: 'An index mainly improves:',
        options: ['Query search speed', 'Table color', 'Password strength', 'Column naming'],
        answer: 0,
      },
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    level: 'Frontend plus API basics',
    minutes: 10,
    description: 'React, HTTP, forms, and client-server flow.',
    questions: [
      {
        text: 'Which React hook is used for component state?',
        options: ['useEffect', 'useMemo', 'useState', 'useRef'],
        answer: 2,
      },
      {
        text: 'HTTP status 201 usually means:',
        options: ['Bad request', 'Created successfully', 'Unauthorized', 'Server error'],
        answer: 1,
      },
      {
        text: 'Which method sends JSON data to create a resource?',
        options: ['GET', 'POST', 'HEAD', 'TRACE'],
        answer: 1,
      },
      {
        text: 'CORS mainly controls:',
        options: ['Database indexes', 'Cross-origin browser requests', 'Password hashing', 'UI colors'],
        answer: 1,
      },
      {
        text: 'In controlled React inputs, the input value comes from:',
        options: ['Browser cache only', 'Component state', 'CSS variables', 'Server logs'],
        answer: 1,
      },
      {
        text: 'Which HTTP method is normally idempotent for updating a whole resource?',
        options: ['POST', 'PATCH', 'PUT', 'CONNECT'],
        answer: 2,
      },
      {
        text: 'Which React hook is best for running side effects after render?',
        options: ['useState', 'useEffect', 'useMemo', 'useId'],
        answer: 1,
      },
      {
        text: 'What does JSON stand for?',
        options: ['JavaScript Object Notation', 'Java Secure Object Network', 'Joined Server Object Name', 'JavaScript Online Node'],
        answer: 0,
      },
      {
        text: 'Which CSS layout system is best for two-dimensional page layout?',
        options: ['Float', 'Grid', 'Inline', 'Visibility'],
        answer: 1,
      },
      {
        text: 'A frontend usually communicates with a backend through:',
        options: ['API requests', 'Local fonts', 'CSS selectors', 'Browser bookmarks'],
        answer: 0,
      },
    ],
  },
  {
    id: 'aptitude',
    title: 'Aptitude',
    level: 'Placement practice',
    minutes: 8,
    description: 'Percentages, ratios, logic, and speed math.',
    questions: [
      {
        text: 'If 20% of a number is 40, what is the number?',
        options: ['80', '120', '160', '200'],
        answer: 3,
      },
      {
        text: 'The ratio 3:5 has a total of 64. What is the larger part?',
        options: ['24', '32', '40', '48'],
        answer: 2,
      },
      {
        text: 'A train travels 120 km in 2 hours. What is its speed?',
        options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
        answer: 2,
      },
      {
        text: 'Find the next number: 2, 6, 12, 20, 30, ?',
        options: ['36', '40', '42', '44'],
        answer: 2,
      },
      {
        text: 'If the price rises from 500 to 600, the percentage increase is:',
        options: ['10%', '15%', '20%', '25%'],
        answer: 2,
      },
      {
        text: 'A shopkeeper gives 10% discount on 1000. What is the selling price?',
        options: ['800', '850', '900', '950'],
        answer: 2,
      },
      {
        text: 'If 5 workers finish a job in 12 days, 10 workers finish it in:',
        options: ['4 days', '5 days', '6 days', '10 days'],
        answer: 2,
      },
      {
        text: 'Simple interest on 2000 at 5% for 2 years is:',
        options: ['100', '150', '200', '250'],
        answer: 2,
      },
      {
        text: 'Average of 10, 20, 30, 40 is:',
        options: ['20', '25', '30', '35'],
        answer: 1,
      },
      {
        text: 'If A is taller than B and B is taller than C, who is tallest?',
        options: ['A', 'B', 'C', 'Cannot say'],
        answer: 0,
      },
    ],
  },
  {
    id: 'security',
    title: 'Cyber Security',
    level: 'Awareness basics',
    minutes: 9,
    description: 'Passwords, phishing, authentication, and safe systems.',
    questions: [
      {
        text: 'Which password is strongest?',
        options: ['password123', 'qwerty2026', 'Mango!River7Cloud#', 'admin'],
        answer: 2,
      },
      {
        text: 'Phishing is mainly an attempt to:',
        options: ['Improve network speed', 'Steal sensitive information', 'Compress files', 'Format a disk'],
        answer: 1,
      },
      {
        text: 'Two-factor authentication adds:',
        options: ['A second verification step', 'A faster browser', 'More database storage', 'A public password'],
        answer: 0,
      },
      {
        text: 'JWTs are commonly used to:',
        options: ['Style web pages', 'Authorize API requests', 'Create SQL tables', 'Compile Java code'],
        answer: 1,
      },
      {
        text: 'A safe API should avoid returning:',
        options: ['Status codes', 'User passwords', 'JSON responses', 'Validation messages'],
        answer: 1,
      },
      {
        text: 'Password hashing is used to:',
        options: ['Make passwords readable', 'Store passwords safely', 'Increase screen brightness', 'Speed up CSS'],
        answer: 1,
      },
      {
        text: 'HTTPS protects data mainly by:',
        options: ['Encrypting traffic', 'Deleting cookies', 'Hiding HTML', 'Blocking all APIs'],
        answer: 0,
      },
      {
        text: 'Which attack tries many passwords repeatedly?',
        options: ['Brute force', 'Refactoring', 'Pagination', 'Caching'],
        answer: 0,
      },
      {
        text: 'A role-based system controls:',
        options: ['Who can access what', 'Which monitor is used', 'File size only', 'Keyboard language'],
        answer: 0,
      },
      {
        text: 'Which token header is commonly used for protected API calls?',
        options: ['Content-Length', 'Authorization', 'Accept-Language', 'Cache-Control'],
        answer: 1,
      },
    ],
  },
]

const blankQuestion = {
  text: '',
  points: 1,
  options: [
    { text: '', correct: true },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
  ],
}

const starterQuiz = {
  title: 'Java Fundamentals Check',
  subject: 'Programming',
  description: 'Assess Java basics with a balanced set of multiple-choice questions.',
  durationMinutes: 20,
  published: true,
  questions: [
    {
      text: 'Which keyword is used to inherit a class in Java?',
      points: 1,
      options: [
        { text: 'implements', correct: false },
        { text: 'extends', correct: true },
        { text: 'inherits', correct: false },
        { text: 'super', correct: false },
      ],
    },
    {
      text: 'Which collection stores unique values?',
      points: 1,
      options: [
        { text: 'ArrayList', correct: false },
        { text: 'HashSet', correct: true },
        { text: 'LinkedList', correct: false },
        { text: 'Stack', correct: false },
      ],
    },
    {
      text: 'Which block runs whether an exception occurs or not?',
      points: 1,
      options: [
        { text: 'try', correct: false },
        { text: 'catch', correct: false },
        { text: 'finally', correct: true },
        { text: 'throw', correct: false },
      ],
    },
  ],
}

function App() {
  const [authMode, setAuthMode] = useState('login')
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('oqs-session')
    return saved ? JSON.parse(saved) : null
  })
  const [authForm, setAuthForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'STUDENT',
  })
  const [activeView, setActiveView] = useState('practice')
  const [quizzes, setQuizzes] = useState([])
  const [adminStats, setAdminStats] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [quizForm, setQuizForm] = useState(starterQuiz)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [apiOnline, setApiOnline] = useState(false)
  const [loading, setLoading] = useState(false)

  const isStudent = session?.role === 'STUDENT'
  const isTeacher = session?.role === 'TEACHER'
  const isAdmin = session?.role === 'ADMIN'
  const workspaceTitle = isAdmin ? 'Admin control center' : isTeacher ? 'Teacher studio' : 'Student learning hub'
  const completion = selectedQuiz?.questions?.length
    ? Math.round((Object.keys(answers).length / selectedQuiz.questions.length) * 100)
    : 0

  const stats = useMemo(
    () => ({
      quizzes: quizzes.length,
      practiceTopics: practiceTopics.length,
      questions: quizzes.reduce((total, quiz) => total + (quiz.questionCount ?? 0), 0),
    }),
    [quizzes],
  )

  useEffect(() => {
    checkHealth()
  }, [])

  useEffect(() => {
    if (session) {
      localStorage.setItem('oqs-session', JSON.stringify(session))
      loadQuizzes(session.token)
      if (session.role === 'ADMIN') {
        Promise.all([
          fetch(`${API_URL}/admin/stats`, {
            headers: { Authorization: `Bearer ${session.token}` },
          }),
          fetch(`${API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${session.token}` },
          }),
        ])
          .then(async ([statsResponse, usersResponse]) => {
            if (!statsResponse.ok || !usersResponse.ok) {
              throw new Error('Unable to load admin dashboard')
            }
            setAdminStats(await statsResponse.json())
            setUsers(await usersResponse.json())
          })
          .catch((error) => setStatus({ type: 'error', message: error.message }))
      }
    } else {
      localStorage.removeItem('oqs-session')
      setQuizzes([])
      setSelectedQuiz(null)
    }
  }, [session])

  useEffect(() => {
    if (!session) return

    if (isStudent && (activeView === 'builder' || activeView === 'users' || activeView === 'admin')) {
      setActiveView('practice')
    }

    if (isTeacher && (activeView === 'practice' || activeView === 'users' || activeView === 'admin' || (activeView === 'take' && selectedQuiz?.source === 'practice'))) {
      setSelectedQuiz(null)
      setActiveView('overview')
    }

    if (isAdmin && (activeView === 'practice' || activeView === 'builder' || (activeView === 'take' && selectedQuiz?.source === 'practice'))) {
      setSelectedQuiz(null)
      setActiveView('admin')
    }
  }, [activeView, isAdmin, isStudent, isTeacher, selectedQuiz, session])

  async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
        ...(options.headers ?? {}),
      },
    })

    const text = await response.text()
    const data = text ? JSON.parse(text) : null

    if (!response.ok) {
      const message = data?.message ?? Object.values(data ?? {})[0] ?? 'Request failed'
      throw new Error(message)
    }

    return data
  }

  async function checkHealth() {
    try {
      await fetch(`${API_URL}/health`)
      setApiOnline(true)
    } catch {
      setApiOnline(false)
    }
  }

  async function loadQuizzes(token = session?.token) {
    if (!token) return
    try {
      const response = await fetch(`${API_URL}/quizzes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Unable to load quizzes')
      setQuizzes(await response.json())
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  async function loadAdminDashboard() {
    try {
      const [statsData, usersData] = await Promise.all([
        request('/admin/stats'),
        request('/admin/users'),
      ])
      setAdminStats(statsData)
      setUsers(usersData)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  async function handleAuth(event) {
    event.preventDefault()
    setLoading(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const payload =
        authMode === 'login'
          ? { email: authForm.email, password: authForm.password }
          : authForm
      const data = await request(`/auth/${authMode}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setSession(data)
      setActiveView(data.role === 'STUDENT' ? 'practice' : data.role === 'ADMIN' ? 'admin' : 'overview')
      setStatus({ type: 'success', message: data.message })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  async function openQuiz(quizId) {
    setLoading(true)
    setResult(null)
    setAnswers({})
    try {
      const data = await request(`/quizzes/${quizId}`)
      setSelectedQuiz({ ...data, source: 'published' })
      setActiveView('take')
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  function startPractice(topic) {
    if (!isStudent) return

    const questions = topic.questions.map((question, questionIndex) => ({
      id: Number(`${questionIndex + 1}01`),
      text: question.text,
      points: 1,
      options: question.options.map((option, optionIndex) => ({
        id: Number(`${questionIndex + 1}0${optionIndex + 1}`),
        text: option,
        correct: optionIndex === question.answer,
      })),
    }))

    setSelectedQuiz({
      id: `practice-${topic.id}`,
      source: 'practice',
      title: `${topic.title} Practice Session`,
      subject: topic.title,
      description: topic.description,
      durationMinutes: topic.minutes,
      questionCount: questions.length,
      questions,
    })
    setAnswers({})
    setResult(null)
    setActiveView('take')
    setStatus({ type: 'success', message: `${topic.title} practice generated` })
  }

  async function submitQuiz() {
    if (!selectedQuiz) return

    if (selectedQuiz.source === 'practice') {
      const score = selectedQuiz.questions.reduce((total, question) => {
        const selectedOption = question.options.find((option) => option.id === answers[question.id])
        return selectedOption?.correct ? total + question.points : total
      }, 0)
      const totalPoints = selectedQuiz.questions.reduce((total, question) => total + question.points, 0)
      setResult({
        score,
        totalPoints,
        percentage: Math.round((score * 10000) / totalPoints) / 100,
        message: 'Practice completed',
      })
      setStatus({ type: 'success', message: 'Practice completed. Review your score and try another topic.' })
      return
    }

    setLoading(true)
    try {
      const data = await request(`/quizzes/${selectedQuiz.id}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, optionId]) => ({
            questionId: Number(questionId),
            optionId: Number(optionId),
          })),
        }),
      })
      setResult(data)
      setStatus({ type: 'success', message: data.message })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  async function createQuiz(event) {
    event.preventDefault()
    setLoading(true)
    try {
      const cleanedQuiz = {
        ...quizForm,
        questions: quizForm.questions.map((question) => ({
          ...question,
          options: question.options.filter((option) => option.text.trim()),
        })),
      }
      const data = await request('/quizzes', {
        method: 'POST',
        body: JSON.stringify(cleanedQuiz),
      })
      setStatus({ type: 'success', message: `${data.title} published successfully` })
      setQuizForm(starterQuiz)
      await loadQuizzes()
      setActiveView('library')
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  function updateQuestion(index, field, value) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.map((question, questionIndex) =>
        questionIndex === index ? { ...question, [field]: value } : question,
      ),
    }))
  }

  function updateOption(questionIndex, optionIndex, field, value) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.map((question, index) => {
        if (index !== questionIndex) return question
        return {
          ...question,
          options: question.options.map((option, innerIndex) => {
            if (innerIndex !== optionIndex) {
              return field === 'correct' ? { ...option, correct: false } : option
            }
            return { ...option, [field]: value }
          }),
        }
      }),
    }))
  }

  function addQuestion() {
    setQuizForm((current) => ({
      ...current,
      questions: [...current.questions, structuredClone(blankQuestion)],
    }))
  }

  function removeQuestion(questionIndex) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.filter((_, index) => index !== questionIndex),
    }))
  }

  function addOption(questionIndex) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.map((question, index) =>
        index === questionIndex
          ? { ...question, options: [...question.options, { text: '', correct: false }] }
          : question,
      ),
    }))
  }

  function removeOption(questionIndex, optionIndex) {
    setQuizForm((current) => ({
      ...current,
      questions: current.questions.map((question, index) => {
        if (index !== questionIndex || question.options.length <= 2) return question
        const nextOptions = question.options.filter((_, innerIndex) => innerIndex !== optionIndex)
        if (!nextOptions.some((option) => option.correct)) {
          nextOptions[0] = { ...nextOptions[0], correct: true }
        }
        return { ...question, options: nextOptions }
      }),
    }))
  }

  function logout() {
    setSession(null)
    setStatus({ type: 'idle', message: '' })
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="brand-mark">OQS</span>
          <strong>Online Quiz System</strong>
        </div>
        <div className="topbar-actions">
          <span className={apiOnline ? 'status-dot online' : 'status-dot'}>
            {apiOnline ? 'API online' : 'API offline'}
          </span>
          {session && (
            <button className="ghost-button" type="button" onClick={logout}>
              Sign out
            </button>
          )}
        </div>
      </header>

      {status.message && <p className={`notice ${status.type}`}>{status.message}</p>}

      {!session ? (
        <section className="auth-layout">
          <div className="intro-panel">
            <span className="eyebrow">Assessment and practice platform</span>
            <h1>Practice topics, publish quizzes, and track learning in one clean system.</h1>
            <p>
              Students can start instant practice sessions by topic. Teachers can publish structured
              quizzes with multiple questions, options, marks, and automatic scoring.
            </p>
            <div className="metric-row">
              <span>Topic practice</span>
              <span>Teacher quiz builder</span>
              <span>Live scoring</span>
            </div>
          </div>

          <form className="auth-card" onSubmit={handleAuth}>
            <div className="segmented">
              <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>
                Login
              </button>
              <button type="button" className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>
                Register
              </button>
            </div>

            {authMode === 'register' && (
              <>
                <label>
                  Full name
                  <input value={authForm.fullName} onChange={(event) => setAuthForm({ ...authForm, fullName: event.target.value })} />
                </label>
                <label>
                  Role
                  <select value={authForm.role} onChange={(event) => setAuthForm({ ...authForm, role: event.target.value })}>
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </label>
              </>
            )}

            <label>
              Email
              <input type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} />
            </label>
            <label>
              Password
              <input type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} />
            </label>
            <button className="primary-button" disabled={loading} type="submit">
              {loading ? 'Please wait...' : authMode === 'login' ? 'Login to workspace' : 'Create account'}
            </button>
          </form>
        </section>
      ) : (
        <section className="dashboard">
          <aside className="side-panel">
            <span className="eyebrow">Signed in as {session.role}</span>
            <h2>{session.fullName}</h2>
            <p>{session.email}</p>
            <div className="stat-grid">
              <div><strong>{isAdmin ? adminStats?.totalUsers ?? 0 : isStudent ? stats.practiceTopics : stats.quizzes}</strong><span>{isAdmin ? 'Users' : isStudent ? 'Topics' : 'Quizzes'}</span></div>
              <div><strong>{isAdmin ? adminStats?.teachers ?? 0 : stats.quizzes}</strong><span>{isAdmin ? 'Teachers' : 'Published'}</span></div>
              <div><strong>{isAdmin ? adminStats?.attempts ?? 0 : stats.questions}</strong><span>{isAdmin ? 'Attempts' : 'Questions'}</span></div>
            </div>
            <nav className="side-nav">
              {isStudent && <button className={activeView === 'practice' ? 'active' : ''} type="button" onClick={() => setActiveView('practice')}>Practice</button>}
              {isAdmin && <button className={activeView === 'admin' ? 'active' : ''} type="button" onClick={() => setActiveView('admin')}>Platform</button>}
              {isAdmin && <button className={activeView === 'users' ? 'active' : ''} type="button" onClick={() => setActiveView('users')}>Users</button>}
              {isTeacher && <button className={activeView === 'overview' ? 'active' : ''} type="button" onClick={() => setActiveView('overview')}>Overview</button>}
              {isTeacher && <button className={activeView === 'builder' ? 'active' : ''} type="button" onClick={() => setActiveView('builder')}>Quiz builder</button>}
              <button className={activeView === 'library' ? 'active' : ''} type="button" onClick={() => setActiveView('library')}>Quiz library</button>
            </nav>
          </aside>

          <div className="workspace">
            <section className="toolbar">
              <div>
                <span className="eyebrow">Dashboard</span>
                <h1>{workspaceTitle}</h1>
              </div>
              <button className="ghost-button" type="button" onClick={() => loadQuizzes()}>
                Refresh
              </button>
            </section>

            {isStudent && activeView === 'practice' && (
              <section className="panel">
                <div className="section-head">
                  <div>
                    <span className="eyebrow">Instant practice</span>
                    <h2>Choose a topic and start a 10-question practice session</h2>
                  </div>
                  <p>Focused practice sets for interview, semester, and placement preparation.</p>
                </div>
                <div className="learning-board">
                  <div className="topic-list">
                    {practiceTopics.map((topic, index) => (
                      <button className="topic-row" key={topic.id} type="button" onClick={() => startPractice(topic)}>
                        <span className="topic-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="topic-main">
                          <strong>{topic.title}</strong>
                          <small>{topic.description}</small>
                        </span>
                        <span className="topic-meta">{topic.level}</span>
                        <span className="topic-count">{topic.questions.length} Qs</span>
                        <span className="topic-action">Start</span>
                      </button>
                    ))}
                  </div>
                  <aside className="learning-summary">
                    <span className="eyebrow">Practice plan</span>
                    <h3>50 curated questions</h3>
                    <p>Five topics with ten useful questions each. Pick a topic, complete every answer, and get instant scoring.</p>
                    <div className="summary-strip">
                      <span>Java</span>
                      <span>DBMS</span>
                      <span>Web</span>
                      <span>Aptitude</span>
                      <span>Security</span>
                    </div>
                  </aside>
                </div>
              </section>
            )}

            {isAdmin && activeView === 'admin' && (
              <section className="workspace-hero admin-hero">
                <div className="hero-copy">
                  <span className="eyebrow">Platform administration</span>
                  <h2>Manage users, monitor quiz activity, and keep the assessment platform healthy.</h2>
                  <p>
                    Admins focus on system control. Teachers create content. Students learn and attempt quizzes.
                  </p>
                  <div className="hero-actions">
                    <button className="primary-button inline" type="button" onClick={() => setActiveView('users')}>
                      Manage users
                    </button>
                    <button className="ghost-button" type="button" onClick={() => loadAdminDashboard()}>
                      Sync metrics
                    </button>
                  </div>
                </div>
                <div className="admin-metrics">
                  <div><span>Total users</span><strong>{adminStats?.totalUsers ?? 0}</strong></div>
                  <div><span>Students</span><strong>{adminStats?.students ?? 0}</strong></div>
                  <div><span>Teachers</span><strong>{adminStats?.teachers ?? 0}</strong></div>
                  <div><span>Admins</span><strong>{adminStats?.admins ?? 0}</strong></div>
                  <div><span>Quizzes</span><strong>{adminStats?.quizzes ?? 0}</strong></div>
                  <div><span>Attempts</span><strong>{adminStats?.attempts ?? 0}</strong></div>
                </div>
              </section>
            )}

            {isAdmin && activeView === 'users' && (
              <section className="panel">
                <div className="section-head">
                  <div>
                    <span className="eyebrow">Access control</span>
                    <h2>Registered users</h2>
                  </div>
                  <p>Admins can audit who is using the system and which role each account has.</p>
                </div>
                <div className="user-table">
                  <div className="user-row header-row">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                  </div>
                  {users.map((user) => (
                    <div className="user-row" key={user.id}>
                      <strong>{user.fullName}</strong>
                      <span>{user.email}</span>
                      <em>{user.role}</em>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {isTeacher && activeView === 'overview' && (
              <section className="workspace-hero">
                <div className="hero-copy">
                  <span className="eyebrow">Teacher workspace</span>
                  <h2>Create assessments, publish quizzes, and manage student-ready content.</h2>
                  <p>
                    Build structured quizzes with marks, multiple options, correct answers, and instant publishing.
                  </p>
                  <div className="hero-actions">
                    <button className="primary-button inline" type="button" onClick={() => setActiveView('builder')}>
                      Create new quiz
                    </button>
                    <button className="ghost-button" type="button" onClick={() => setActiveView('library')}>
                      View library
                    </button>
                  </div>
                </div>
                <div className="command-grid">
                  <button className="command-card accent-a" type="button" onClick={() => setActiveView('builder')}>
                    <span>01</span>
                    <strong>Quiz builder</strong>
                    <small>Create multi-question quizzes with marks and answer keys.</small>
                  </button>
                  <button className="command-card accent-b" type="button" onClick={() => setActiveView('library')}>
                    <span>02</span>
                    <strong>Published quizzes</strong>
                    <small>Review what students can attempt from the backend library.</small>
                  </button>
                  <div className="command-card accent-c">
                    <span>03</span>
                    <strong>Assessment flow</strong>
                    <small>Students attempt, submit, and receive automatic scoring.</small>
                  </div>
                </div>
              </section>
            )}

            {activeView === 'library' && (
              <section className="panel">
                <div className="section-head">
                  <div>
                    <span className="eyebrow">Published by teachers</span>
                    <h2>Quiz library</h2>
                  </div>
                  <p>These quizzes are stored in MySQL through the Spring Boot backend.</p>
                </div>
                {quizzes.length === 0 ? (
                  <p className="empty-state">
                    {isStudent
                      ? 'No teacher-published quizzes yet. Use Practice now, or wait for a teacher to publish one.'
                      : 'No quizzes published yet. Open Quiz builder and publish the first assessment.'}
                  </p>
                ) : (
                  <div className="quiz-list library-list">
                    {quizzes.map((quiz) => (
                      <button className="quiz-card" key={quiz.id} type="button" onClick={() => openQuiz(quiz.id)}>
                        <span>{quiz.subject}</span>
                        <strong>{quiz.title}</strong>
                        <small>{quiz.questionCount} questions / {quiz.durationMinutes} min / {quiz.createdBy}</small>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeView === 'take' && (
              <section className="panel quiz-runner">
                {!selectedQuiz ? (
                  <p className="empty-state">Select a practice topic or a published quiz to begin.</p>
                ) : (
                  <>
                    <div className="runner-head">
                      <div>
                        <span className="eyebrow">{selectedQuiz.source === 'practice' ? 'Practice mode' : selectedQuiz.subject}</span>
                        <h2>{selectedQuiz.title}</h2>
                        <p>{selectedQuiz.description}</p>
                      </div>
                      <strong>{completion}%</strong>
                    </div>
                    {selectedQuiz.questions.map((question, index) => (
                      <fieldset className="question-block" key={question.id}>
                        <legend>{index + 1}. {question.text}</legend>
                        {question.options.map((option) => (
                          <label className="option-row" key={option.id}>
                            <input
                              checked={answers[question.id] === option.id}
                              name={`question-${question.id}`}
                              type="radio"
                              onChange={() => setAnswers({ ...answers, [question.id]: option.id })}
                            />
                            {option.text}
                          </label>
                        ))}
                      </fieldset>
                    ))}
                    <button className="primary-button" disabled={loading || Object.keys(answers).length !== selectedQuiz.questions.length} type="button" onClick={submitQuiz}>
                      Submit quiz
                    </button>
                    {result && (
                      <div className="result-box">
                        <strong>{result.percentage}%</strong>
                        <span>{result.score} out of {result.totalPoints} points</span>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}

            {isTeacher && activeView === 'builder' && (
              <form className="panel builder" onSubmit={createQuiz}>
                <div className="builder-head">
                  <div>
                    <span className="eyebrow">Teacher tools</span>
                    <h2>Create a professional quiz</h2>
                  </div>
                  <button className="ghost-button" type="button" onClick={addQuestion}>Add question</button>
                </div>
                <div className="form-grid">
                  <label>Title<input value={quizForm.title} onChange={(event) => setQuizForm({ ...quizForm, title: event.target.value })} /></label>
                  <label>Subject<input value={quizForm.subject} onChange={(event) => setQuizForm({ ...quizForm, subject: event.target.value })} /></label>
                  <label>Duration<input type="number" min="1" value={quizForm.durationMinutes} onChange={(event) => setQuizForm({ ...quizForm, durationMinutes: Number(event.target.value) })} /></label>
                </div>
                <label>Description<textarea value={quizForm.description} onChange={(event) => setQuizForm({ ...quizForm, description: event.target.value })} /></label>

                <div className="builder-summary">
                  <span>{quizForm.questions.length} questions</span>
                  <span>{quizForm.questions.reduce((total, question) => total + Number(question.points || 0), 0)} marks</span>
                  <span>{quizForm.published ? 'Published after save' : 'Draft'}</span>
                </div>

                {quizForm.questions.map((question, questionIndex) => (
                  <div className="question-editor" key={questionIndex}>
                    <div className="question-editor-head">
                      <strong>Question {questionIndex + 1}</strong>
                      <button className="text-button" disabled={quizForm.questions.length === 1} type="button" onClick={() => removeQuestion(questionIndex)}>
                        Remove
                      </button>
                    </div>
                    <div className="question-grid">
                      <label>Question<input value={question.text} onChange={(event) => updateQuestion(questionIndex, 'text', event.target.value)} /></label>
                      <label>Marks<input type="number" min="1" value={question.points} onChange={(event) => updateQuestion(questionIndex, 'points', Number(event.target.value))} /></label>
                    </div>
                    <div className="options-editor">
                      {question.options.map((option, optionIndex) => (
                        <label className="option-editor" key={optionIndex}>
                          <input
                            type="radio"
                            checked={option.correct}
                            name={`correct-${questionIndex}`}
                            onChange={() => updateOption(questionIndex, optionIndex, 'correct', true)}
                          />
                          <input value={option.text} placeholder={`Option ${optionIndex + 1}`} onChange={(event) => updateOption(questionIndex, optionIndex, 'text', event.target.value)} />
                          <button className="mini-button" disabled={question.options.length <= 2} type="button" onClick={() => removeOption(questionIndex, optionIndex)}>
                            Remove
                          </button>
                        </label>
                      ))}
                    </div>
                    <button className="ghost-button compact" type="button" onClick={() => addOption(questionIndex)}>
                      Add option
                    </button>
                  </div>
                ))}
                <button className="primary-button" disabled={loading} type="submit">Publish quiz to students</button>
              </form>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

export default App
