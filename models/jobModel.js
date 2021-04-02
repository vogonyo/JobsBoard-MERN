const mongoose = require('mongoose');
const slugify = require('slugify');
const marked= require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Job must have company name'],
        trim: true
    },
    logo: {
        type: String,
        required: [true, 'Job posting must have company logo']
    },
    description: {
        type: String,
        required: [true, 'Job posting must have a description'],
     },
    new: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        required: [true, 'Job must have position'],
        maxlength:[50, 'Job must have less than 50 characters'],
        minlength: [5, 'Position must have at least 5 characters']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    role: {
        type: String,
        required: [true, 'Job Posting must have  a role']
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    contract: {
        type: String,
        required: [true, 'A job must have a contract'],
        enum:{
            values: ['Part Time', 'Full Time', 'Contract'],
            message: 'Contract is either Partime or fulltime or contract'
        }
    },
    level: {
        type: String,
        required: [true, 'A job must have a level'],
        enum:{
            values: ['Senior', 'Junior', 'Midweight'],
            message: 'Level can be either Senior , Junior, or Midweight'
        }
    },
    location: {
        type: String,
        required: [true, 'Job must have a location']
    },
    languages: [{type: String}],
    tools:[{type: String}],
    postedBy: {        
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'User'    
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});


jobSchema.pre('save', function(next){
    //Slug
    this.slug = slugify(this.position + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36), {strict: true});
    next();
});

//Sanitize description from harmful html input ++
//convert markdown to html
jobSchema.pre('validate', function(next){
  if(this.description){
      this.sanitizedHtml = dompurify(marked(this.description))
  }
  next();
});

const Job =  mongoose.model('Job', jobSchema);

module.exports = Job;