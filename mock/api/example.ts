import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  {
    url: '/mock/api/example/501',
    method: 'get',
    statusCode: 501
  },
  {
    url: '/mock/api/example/logic/error',
    method: 'post',
    statusCode: 200,
    response: () => {
      return {
        code: 201,
        msg: '业务错误'
      };
    }
  },
  {
    url: '/mock/api/example/logic/success',
    method: 'post',
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          total: 100,
          page: 1,
          pageSize: 10,
          data: [
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            },
            {
              email: 'test@gmail.com',
              signature: '海纳百川，有容乃大',
              introduction: '微笑着，努力着，欣赏着',
              title: '交互专家',
              group: '某某某事业群－某某平台部－某某技术部－UED'
            }
          ]
        }
      };
    }
  }
];

export default apis;
