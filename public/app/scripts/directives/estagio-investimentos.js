'use strict';

angular.module('pacApp')
  .directive('pacEstagioInvestimentos', ['vega', function (vega) {
    return {
      replace: true,
      restrict: 'A',
      link: function (scope, iElement) {
        var view,
            width,
            height = 350;

        function drawChart(){

          width = parseInt(iElement.css('width').replace('px',''),10);

          var data = {
            table: [
              { 'color':'#A085C6','estagio': 'Em Licitação', 'total': 120 },
              { 'color':'#EB585C','estagio': 'Ação Preparatória', 'total': 310 },
              { 'color':'#FF8FB4','estagio': 'A Celecionar', 'total': 450 },
              { 'color':'#68D286','estagio': 'A Contratar', 'total': 890 },
              { 'color':'#FDD26D','estagio': 'Concluído', 'total': 1902 },
              { 'color':'#1DA1CD','estagio': 'Em Andamento', 'total': 2000 }
            ]
          };

          var estagios = [], colors = [];

          for (var i = 0;i < data.table.length; i++) {
            estagios.push(data.table[i].estagio+' :  '+data.table[i].total);
            colors.push(data.table[i].color);
          }

          var spec = {
            'width': width,
            'height': height,
            'padding': { 'top': 10, 'left': 10, 'bottom': 10, 'right': 10 },
            'data': [{
              'name': 'table',
              'transform': [{'type': 'pie', 'value': 'data.total'}]
            }],
            'scales':
            [
              {
                'name': 'r',
                'type': 'sqrt',
                'domain': {'data': 'table', 'field': 'data.total'},
                'range': [130, 180]
              },
              {
                'name': 'size',
                'type': 'linear',
                'sort': true,
                'domain': {'data': 'table', 'field': 'data.total'},
                'range': [100, 1000]
              },
              {
                'name': 'estagios',
                'type': 'ordinal',
                'sort': true,
                'domain': {'data': 'table', 'field': 'data.total'},
                'range': estagios
              },
              {
                'name': 'color',
                'type': 'ordinal',
                'sort': true,
                'domain': {'data': 'table', 'field': 'data.total'},
                'range': colors
              }
            ],
            'legends': [{
              'size': 'size',
              'fill': 'color',
              'orient': 'left',
              'properties': {
                'title': {
                  'fontSize': {'value': 16}
                },
                'symbols': {
                  'stroke': {'value': 'transparent'},
                  'shape': {'value': 'square'}
                },
                'labels': {
                  'fill': {'value': '#656567'},
                  'fontSize': {'value': 16},
                  'fontFamily': {'value': 'Helvetica'},
                  'text': {'scale': 'estagios'}
                },
                'legend': {
                  'padding': {'value': 10},
                  'stroke': {'value': '#ccc'},
                  'strokeWidth': {'value': 0},
                  'x': {'value': 0},
                  'y': {'value': 10}
                }
              }
            }],
            'marks': [
              {
                'type': 'arc',
                'from': { 'data': 'table' },
                'properties': {
                  'enter': {
                    'x': {'group': 'width', 'mult': 0.7},
                    'y': {'group': 'height', 'mult': 0.5},
                    'startAngle': {'field': 'startAngle'},
                    'endAngle': {'field': 'endAngle'},
                    'innerRadius': {'value': 80},
                    'outerRadius': {'scale': 'r', 'field': 'data.total'},
                    'fill': {'field': 'data.color'},
                    'stroke': {'value': 'white'},
                    'strokeWidth': {'value': 2}
                  }
                }
              }
            ]
          };

          vega.parse.spec(spec, function(chart){
            view = chart({el: iElement[0], data: data}).update();
          });

        }

        drawChart();
        angular.element(window).on('resize', drawChart);
      }
    };
  }]);
