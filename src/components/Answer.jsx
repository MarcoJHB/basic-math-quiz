import React from 'react';


export const Answer = () => {
  return (
    <div className='answer'>
        <form onSubmit={this.onSubmitTask}>
          <input type="number" id="numberInput" onChange={this.handleChange} value={answer.text} />
          <button type="submit">Add Task</button>
        </form>
    </div>
  )
}
