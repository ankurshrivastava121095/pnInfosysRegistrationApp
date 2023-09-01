import { CChart } from '@coreui/react-chartjs'
import React from 'react'

function PieChart() {
    return (
        <CChart
            type="doughnut"
            data={{
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [40, 20, 80, 10],
                },
                ],
            }}
        />
    )
}

export default PieChart