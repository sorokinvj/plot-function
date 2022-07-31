This is the app that plots function graphs.
it receives new coordinate values via websocket from the backend, which is deployed [here](https://enigmatic-garden-78129.herokuapp.com). Backend repo is [here](https://github.com/sorokinvj/function-values-socket-server)

The frontend of the app is based on Create React App package. I had to eject it to tune Jest setup.

The app itself is pretty simple, it has two components that render chart and table view.

# Design choices:

- to show chart I am using Amcharts library, its quite big, but it is easy to use and you can achieve interesting animation, like the red bullet highlighting last received value.

- I am not using any css framework, just because its not needed for such a simple app. In real world I would use styled-components or tailwind css

- From the testing perspective Amchart is not really a good choice: in order for tests to run, I had to heavily mock it, otherwise Jest crashes. However, if one would want to test points on the chart (if function is plotted correctly), then it means we basically want to test the library itself, which is outside of the app tests scope. Anyway, I think the process of choosing the library should be based on real requirements, by asking questions like "What is the weakest point of our app?", "Where exactly we want to gain extra confidence as developers?". In this simple app I don't think testing canvas is needed.

# Possible improvements:

- When received values reach the end of the x-axis, it should be resized.
- Let the user resize the graph
