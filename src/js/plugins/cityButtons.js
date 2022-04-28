import $ from 'jquery'
import { onLoadHtmlSucess } from '../core/includes'

const duration = 600

function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        const isTarget = $(this).attr('wm-city') === city
            || city === null

        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration)
            $(this).parent().addClass('d-none')
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })

    const btns = Array.from(cities).map(city => {

        const input = $('<input>').attr('type', 'radio')

        const label = $('<label>').addClass(['btn', 'btn-info']).html(city)
        label.click(e => filterByCity(city))

        label.append(input)


        return label
    })

    const inputAll = $('<input>').attr('type', 'radio').prop('checked', true)

    const labelAll = $('<label>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    labelAll.append(inputAll)
    labelAll.click(e => filterByCity(null))

    btns.push(labelAll)

    const btnGroup = $('<div>').addClass(['btn-group', 'btn-group-toggle']).attr('data-toggle', 'buttons')
    btnGroup.append(btns)

    $(this).html(btnGroup)

    return this
}

onLoadHtmlSucess(function () {
    $('[wm-city-buttons]').cityButtons()
})

