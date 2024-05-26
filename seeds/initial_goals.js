exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('goals').del();

  // Inserts seed entries
  await knex('goals').insert([
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'repeat',
      title: 'Read 10 pages or for 30 min',
      description: '',
      points: 10,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'single',
      title: 'Run outside',
      description: '',
      points: 20,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'repeat',
      title: 'Evening and morning prayer',
      description: '',
      points: 5,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'single',
      title: 'Call and be sweet to parents',
      description: '',
      points: 15,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'repeat',
      title: 'Evening time block',
      description: '',
      points: 10,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'single',
      title: 'Resume and apply to QA and software jobs',
      description: '',
      points: 30,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'assignedRepeat',
      title: 'LinkedIn',
      description: '',
      points: 10,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    },
    {
      id: knex.raw('uuid_generate_v4()'),
      category: 'assignedSingle',
      title: 'Go through clothes and shoes',
      description: '',
      points: 20,
      startDate: knex.fn.now(),
      endDate: null,
      complete: false,
    }
  ]);
};
