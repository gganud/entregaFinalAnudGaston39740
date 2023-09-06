import mongoose from 'mongoose';
import pinoLogger from '../../config/pinoLoggerConfig.js';

class MongooseAdapter
{
    async init(uri)
{
      try
{
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        pinoLogger.info('Connected to MongoDB');
      }
 catch (error)
{
        pinoLogger.error('Error al conectar a MongoDB:', error.message);
      }
    }

    async close()
{
      try
{
        await mongoose.connection.close();
        pinoLogger.info('MongoDB connection closed');
      }
 catch (error)
{
        pinoLogger.error('Error closing MongoDB connection:', error.message);
      }
    }

    async drop()
{
      try
{
        await mongoose.connection.dropDatabase();
        pinoLogger.info('Database dropped');
      }
 catch (error)
{
        pinoLogger.error('Error dropping database', error.message);
      }
    }
}

export default MongooseAdapter;
