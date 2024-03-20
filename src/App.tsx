import { FastFeedbackWidget } from './components/FastFeedbackWidget'

export function App() {
  return (
    <div className="h-screen relative bg-gray-900 text-gray-100">
      <h1>hello</h1>

      <FastFeedbackWidget
        projectId="fbea73a3-e58a-4e3d-b433-97c59cd8c551"
        className="mr-2"
      >
        <button className="fixed right-0 top-1/2 z-40 flex flex-col items-center justify-center gap-2 rounded-bl-[10px] rounded-tl-[10px] bg-cyan-500 px-0 py-4 lg:px-2">
          <p
            className="rotate-180 transform text-xs font-medium text-white lg:text-sm"
            style={{ writingMode: 'vertical-rl' }}
          >
            Feedback
          </p>
        </button>
      </FastFeedbackWidget>
    </div>
  )
}
