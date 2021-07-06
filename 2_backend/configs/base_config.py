import os
import json

import logging
logger = logging.getLogger('Config')
logger.setLevel(logging.DEBUG)

class BaseConfig:
    """
    This class realizes two interface functions for interacting with .json config file.

    MUTABLE_CONFIG_PATH can be redefined in subclass
    """
    _logger = logger
    MUTABLE_CONFIG_PATH = os.path.dirname(os.path.abspath(__file__)) + '/mutable_config.json'

    # returns only variables, not fucntions
    def variables(self):
        """
        Returns dict() with all variables (both self and cls).
        Just filters out _private_vars and methods() from
        self.__dict__ and self.__class__.__dict__ .
        """
        variables = {}
        for key, value in self.__class__.__dict__.items():
            if key.startswith("_"):
                continue
            if str(type(self.__getattribute__(key))) == "<class 'method'>":
                continue
            variables[key] = value

        for key, value in self.__dict__.items():
            if key.startswith("_"):
                continue
            variables[key] = value

        return variables

    def reload_config(self):
        """
        Realizes hot reloading of variable values from .json file.
        """
        try:
            with open(self.MUTABLE_CONFIG_PATH, 'r') as inf:
                mutable_config_dict = json.load(inf)
        except Exception as e:
            logger.warning('Failed to load config from mutable config file! ' + str(e))
            return

        logger.debug('Start loading config from mutable config file:')

        for key, value in mutable_config_dict.items():
            if key in vars(self):
                if type(self.__getattribute__(key)) == type(value):
                    self.__setattr__(key, value)
                    logger.debug('loaded pair: %s = %s' % (key, str(value)))
                else:
                    logger.debug('Cannot load pair: %s = %s! Incompatible types. Expected "%s", but got "%s".' %
                                 (key, str(value), str(type(self.__getattribute__(key))), str(type(value))))
                    print('incompatible types!')

        for key, value in self.variables().items():
            if key in mutable_config_dict:
                if type(value) == type(mutable_config_dict[key]):
                    self.__setattr__(key, mutable_config_dict[key])
                    logger.debug('loaded pair: %s = %s' % (key, str(mutable_config_dict[key])))
                else:
                    logger.debug('Cannot load pair: %s = %s! Incompatible types. Expected "%s", but got "%s".' %
                                 (key, str(mutable_config_dict[key]), str(type(value)),
                                  str(type(mutable_config_dict[key]))))
                    print('incompatible types!')